import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { debounce } from 'lodash';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'ng-s-table-form',
  templateUrl: './ng-s-table-form.component.html',
  styleUrls: ['./ng-s-table-form.component.scss']
})
export class NgSTableFormComponent implements OnInit {
  @ViewChild('divElement') divElement: ElementRef;
  @Input() listItem;
  @Input() listItemFilter;
  @Input() itemSelected;
  @Input() dataTableInput;
  @Input() disableForm;

  @Output() loadMoreItemEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeItemSelectedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchItemEvent: EventEmitter<any> = new EventEmitter<any>();

  showDropdownList = false;
  keyword$: FormControl;
  inSide = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.keyword$ = new FormControl(this.itemSelected.name);
    this.searchItem();
  }

  ngOnChanges() {
    if (this.itemSelected.change) {
      this.keyword$?.setValue(this.itemSelected.name, { emitEvent: false });
      this.itemSelected.change = false;
    }
  }

  mouseOverTable() {
    this.inSide = true;
  }

  mouseLeaveTable() {
    this.inSide = false;
  }

  onClickOutside() {
    if (!this.inSide) {
      this.showDropdownList = false;
      if (!this.listItem.length && this.itemSelected) {
        this.keyword$.setValue(this.itemSelected.name);
      }
      if (this.listItem.length && this.itemSelected && !this.listItemFilter.keyword) {
        this.keyword$?.setValue(this.itemSelected.name, { emitEvent: false });
      }
    }
  }

  loadMoreItem = debounce(($event: any) => {
    const target = $event.target;
    if (target.scrollTop === 0) {
      return;
    }
    if (target.offsetHeight + target.scrollTop >= target.scrollHeight - 50) {
      this.loadMoreItemEvent.emit(true);
    }
  }, 100);

  changeItemSelected(item, event) {
    event.stopPropagation();
    this.keyword$.setValue(item.name, { emitEvent: false });
    this.changeItemSelectedEvent.emit(item);
    this.showDropdownList = false;
  }

  searchItem() {
    this.keyword$.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(value => {
          if (value) {
            this.listItemFilter.keyword = value;
            this.listItemFilter.page = 0;
          } else {
            this.listItemFilter.keyword = '';
          }
        })
      )
      .subscribe(() => {
        this.searchItemEvent.emit(this.listItemFilter.keyword);
      });
  }
}
