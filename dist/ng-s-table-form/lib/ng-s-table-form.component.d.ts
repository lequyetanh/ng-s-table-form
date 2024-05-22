import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class NgSTableFormComponent implements OnInit {
    private elementRef;
    divElement: ElementRef;
    listItem: any;
    listItemFilter: any;
    itemSelected: any;
    dataTableInput: any;
    disableForm: any;
    loadMoreItemEvent: EventEmitter<any>;
    changeItemSelectedEvent: EventEmitter<any>;
    searchItemEvent: EventEmitter<any>;
    showDropdownList: boolean;
    keyword$: FormControl;
    inSide: boolean;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    mouseOverTable(): void;
    mouseLeaveTable(): void;
    onClickOutside(): void;
    loadMoreItem: any;
    changeItemSelected(item: any, event: any): void;
    searchItem(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgSTableFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgSTableFormComponent, "ng-s-table-form", never, { "listItem": "listItem"; "listItemFilter": "listItemFilter"; "itemSelected": "itemSelected"; "dataTableInput": "dataTableInput"; "disableForm": "disableForm"; }, { "loadMoreItemEvent": "loadMoreItemEvent"; "changeItemSelectedEvent": "changeItemSelectedEvent"; "searchItemEvent": "searchItemEvent"; }, never, never, false>;
}
