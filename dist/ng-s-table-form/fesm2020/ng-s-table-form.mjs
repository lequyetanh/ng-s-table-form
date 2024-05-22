import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, Input, Output, forwardRef, Directive, HostListener, NgModule } from '@angular/core';
import { debounce } from 'lodash';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import * as i1 from '@angular/forms';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class NgSTableFormService {
    constructor() { }
}
NgSTableFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgSTableFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class NgSTableFormComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.loadMoreItemEvent = new EventEmitter();
        this.changeItemSelectedEvent = new EventEmitter();
        this.searchItemEvent = new EventEmitter();
        this.showDropdownList = false;
        this.inSide = false;
        this.loadMoreItem = debounce(($event) => {
            const target = $event.target;
            if (target.scrollTop === 0) {
                return;
            }
            if (target.offsetHeight + target.scrollTop >= target.scrollHeight - 50) {
                this.loadMoreItemEvent.emit(true);
            }
        }, 100);
    }
    ngOnInit() {
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
    changeItemSelected(item, event) {
        event.stopPropagation();
        this.keyword$.setValue(item.name, { emitEvent: false });
        this.changeItemSelectedEvent.emit(item);
        this.showDropdownList = false;
    }
    searchItem() {
        this.keyword$.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged(), tap(value => {
            if (value) {
                this.listItemFilter.keyword = value;
                this.listItemFilter.page = 0;
            }
            else {
                this.listItemFilter.keyword = '';
            }
        }))
            .subscribe(() => {
            this.searchItemEvent.emit(this.listItemFilter.keyword);
        });
    }
}
NgSTableFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NgSTableFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NgSTableFormComponent, selector: "ng-s-table-form", inputs: { listItem: "listItem", listItemFilter: "listItemFilter", itemSelected: "itemSelected", dataTableInput: "dataTableInput", disableForm: "disableForm" }, outputs: { loadMoreItemEvent: "loadMoreItemEvent", changeItemSelectedEvent: "changeItemSelectedEvent", searchItemEvent: "searchItemEvent" }, viewQueries: [{ propertyName: "divElement", first: true, predicate: ["divElement"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div [ngStyle]=\"{ 'pointer-events': disableForm ? 'none' : '' }\" class=\"combobox\" #divElement (focusout)=\"onClickOutside()\" (mouseover)=\"mouseOverTable()\" (mouseleave)=\"mouseLeaveTable()\">\r\n  <!--    <div>{{itemSelected | json}}</div>-->\r\n  <input class=\"item-select\" [title]=\"itemSelected.name\" type=\"search\" (click)=\"showDropdownList = true\" [formControl]=\"keyword$\" />\r\n  <div class=\"dropdown-content\" *ngIf=\"showDropdownList\" (scroll)=\"loadMoreItem($event)\">\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <ng-container *ngFor=\"let header of dataTableInput.header\">\r\n            <th class=\"col-3 text-center\">{{ header.label }}</th>\r\n          </ng-container>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <ng-container *ngIf=\"listItem.length; else noItem\">\r\n          <ng-container *ngFor=\"let item of listItem\">\r\n            <tr [class.active]=\"item.id == itemSelected.id\" (click)=\"changeItemSelected(item, $event)\">\r\n              <ng-container *ngFor=\"let body of dataTableInput.header\">\r\n                <td\r\n                  [class]=\"'col-' + 12 / dataTableInput.header.length\"\r\n                  class=\"item-info\"\r\n                  [class.col-2]=\"body.value == 'taxCode'\"\r\n                  [title]=\"item[body.value]\"\r\n                >\r\n                  {{ item[body.value] }}\r\n                </td>\r\n              </ng-container>\r\n            </tr>\r\n          </ng-container>\r\n        </ng-container>\r\n        <ng-template #noItem>\r\n          <tr>\r\n            <td colspan=\"4\">D\u1EEF li\u1EC7u kh\u00F4ng t\u1ED3n t\u1EA1i trong danh m\u1EE5c</td>\r\n          </tr>\r\n        </ng-template>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n", styles: [".combobox{width:100%;height:37px;position:relative}.combobox .item-select{width:100%;height:36px;padding:6px 10px;border:1px solid #d3d3d3;border-radius:4px;outline:none}.combobox .dropdown-content{position:absolute;top:37px;left:0;z-index:3;max-width:120%;max-height:200px;overflow:auto;border-radius:4px}.combobox .dropdown-content th:first-child{text-align:left;padding:0 5px!important}.combobox .dropdown-content table{width:600px;max-width:100%;background-color:#fff}.combobox .dropdown-content table th,.combobox .dropdown-content table td{border:1px solid #b0d4eb;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:150px!important;min-width:120px!important;padding:5px}.combobox .dropdown-content table thead{position:sticky;top:-1px;color:#004671}.combobox .dropdown-content table tbody tr:hover,.combobox .dropdown-content table .active{background-color:#e6f1f8}\n"], dependencies: [{ kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-s-table-form', template: "<div [ngStyle]=\"{ 'pointer-events': disableForm ? 'none' : '' }\" class=\"combobox\" #divElement (focusout)=\"onClickOutside()\" (mouseover)=\"mouseOverTable()\" (mouseleave)=\"mouseLeaveTable()\">\r\n  <!--    <div>{{itemSelected | json}}</div>-->\r\n  <input class=\"item-select\" [title]=\"itemSelected.name\" type=\"search\" (click)=\"showDropdownList = true\" [formControl]=\"keyword$\" />\r\n  <div class=\"dropdown-content\" *ngIf=\"showDropdownList\" (scroll)=\"loadMoreItem($event)\">\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <ng-container *ngFor=\"let header of dataTableInput.header\">\r\n            <th class=\"col-3 text-center\">{{ header.label }}</th>\r\n          </ng-container>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <ng-container *ngIf=\"listItem.length; else noItem\">\r\n          <ng-container *ngFor=\"let item of listItem\">\r\n            <tr [class.active]=\"item.id == itemSelected.id\" (click)=\"changeItemSelected(item, $event)\">\r\n              <ng-container *ngFor=\"let body of dataTableInput.header\">\r\n                <td\r\n                  [class]=\"'col-' + 12 / dataTableInput.header.length\"\r\n                  class=\"item-info\"\r\n                  [class.col-2]=\"body.value == 'taxCode'\"\r\n                  [title]=\"item[body.value]\"\r\n                >\r\n                  {{ item[body.value] }}\r\n                </td>\r\n              </ng-container>\r\n            </tr>\r\n          </ng-container>\r\n        </ng-container>\r\n        <ng-template #noItem>\r\n          <tr>\r\n            <td colspan=\"4\">D\u1EEF li\u1EC7u kh\u00F4ng t\u1ED3n t\u1EA1i trong danh m\u1EE5c</td>\r\n          </tr>\r\n        </ng-template>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n", styles: [".combobox{width:100%;height:37px;position:relative}.combobox .item-select{width:100%;height:36px;padding:6px 10px;border:1px solid #d3d3d3;border-radius:4px;outline:none}.combobox .dropdown-content{position:absolute;top:37px;left:0;z-index:3;max-width:120%;max-height:200px;overflow:auto;border-radius:4px}.combobox .dropdown-content th:first-child{text-align:left;padding:0 5px!important}.combobox .dropdown-content table{width:600px;max-width:100%;background-color:#fff}.combobox .dropdown-content table th,.combobox .dropdown-content table td{border:1px solid #b0d4eb;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:150px!important;min-width:120px!important;padding:5px}.combobox .dropdown-content table thead{position:sticky;top:-1px;color:#004671}.combobox .dropdown-content table tbody tr:hover,.combobox .dropdown-content table .active{background-color:#e6f1f8}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { divElement: [{
                type: ViewChild,
                args: ['divElement']
            }], listItem: [{
                type: Input
            }], listItemFilter: [{
                type: Input
            }], itemSelected: [{
                type: Input
            }], dataTableInput: [{
                type: Input
            }], disableForm: [{
                type: Input
            }], loadMoreItemEvent: [{
                type: Output
            }], changeItemSelectedEvent: [{
                type: Output
            }], searchItemEvent: [{
                type: Output
            }] } });

class CurrencyNumberDirective {
    constructor(el) {
        this.el = el;
        this.previousValue = null;
        this.needOnChange = true;
    }
    ngOnInit() {
        CurrencyNumberDirective.integerFormat = this.getThousandSeparator();
        CurrencyNumberDirective.decimalFormat = this.getDecimalSeparator();
        CurrencyNumberDirective.reGexGetIntegerSymbol = new RegExp(CurrencyNumberDirective.integerFormat.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        // Format và làm tròn khi khởi tạo
        this.el.nativeElement.setAttribute('autocomplete', 'off');
        this.writeValue(this.el.nativeElement.value);
    }
    getThousandSeparator() {
        const thousandSeparator = localStorage.getItem('thousand');
        return thousandSeparator ? thousandSeparator : ',';
    }
    getDecimalSeparator() {
        const decimalSeparator = localStorage.getItem('decimal');
        return decimalSeparator ? decimalSeparator : '.';
    }
    roundNumber(value) {
        if (this.numberRound >= 0) {
            let parts = value.split(CurrencyNumberDirective.decimalFormat);
            if (parts[1] && parts[1].length > this.numberRound) {
                if (this.numberRound > 0) {
                    parts[1] = parseFloat(`0.${parts[1]}`).toFixed(this.numberRound).slice(2);
                }
                else {
                    return Math.round(parseFloat(value)).toString();
                }
            }
            return parts.join(CurrencyNumberDirective.decimalFormat);
        }
        else {
            return value;
        }
    }
    onInput(event) {
        let inputValue = event.target.value;
        if (inputValue !== '0' &&
            inputValue?.charCodeAt(0) === 48 &&
            inputValue?.charCodeAt(1) !== (CurrencyNumberDirective.integerFormat == ',' ? 46 : 44)) {
            inputValue = inputValue.slice(1);
        }
        if (inputValue === null || typeof inputValue === 'undefined' || (inputValue.trim() === '' && inputValue !== '0')) {
            this.onChange('');
            return;
        }
        let dotIndex = inputValue.indexOf(CurrencyNumberDirective.decimalFormat);
        if (dotIndex >= 0 && this.numberRound) {
            if (inputValue.length - 1 - dotIndex > this.numberRound) {
                inputValue = inputValue.substring(0, dotIndex + this.numberRound + 1);
            }
        }
        const lastChar = inputValue[inputValue.length - 1];
        if (lastChar.match(/[0-9]/)) {
            this.formattedValue = this.formatNumber(inputValue);
        }
        else if (lastChar === CurrencyNumberDirective.decimalFormat && !inputValue.slice(0, -1).includes(CurrencyNumberDirective.decimalFormat)) {
            this.formattedValue = this.formatNumber(inputValue.slice(0, -1)) + CurrencyNumberDirective.decimalFormat;
        }
        else {
            const newValue = inputValue.slice(0, -1);
            this.formattedValue = this.formatNumber(newValue);
        }
        this.formattedValue = this.roundNumber(this.formattedValue);
        event.target.value = this.formattedValue;
        if (CurrencyNumberDirective.integerFormat == ',') {
            this.onChange(Number(this.formattedValue.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '')));
        }
        else {
            // thay tất cả dấu . = '' rồi thay , = .
            this.onChange(parseFloat(this.formattedValue.replace(/\./g, '').replace(',', '.')));
        }
        if (this.maxValue !== null && this.maxValue !== undefined) {
            let regexPattern = new RegExp(`[0-9${CurrencyNumberDirective.decimalFormat}]`);
            let numberValue;
            if (CurrencyNumberDirective.integerFormat == ',') {
                numberValue = Number(this.formattedValue.replace(/,/g, ''));
            }
            else {
                numberValue = parseFloat(this.formattedValue.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '').replace(',', '.'));
            }
            if (numberValue > this.maxValue) {
                // Nếu giá trị nhập vào lớn hơn max value
                if (CurrencyNumberDirective.integerFormat == ',') {
                    this.el.nativeElement.value = this.formatNumber(this.maxValue.toString());
                }
                else {
                    this.el.nativeElement.value = this.formatNumber(this.maxValue.toString().replace('.', ','));
                }
                this.onChange(this.maxValue);
                this.needOnChange = false;
            }
            else if (numberValue === this.maxValue && (event.data || '').match(regexPattern)) {
                // Nếu giá trị nhập vào bằng max value và người dùng vẫn đang thêm các số khác
                event.preventDefault();
            }
        }
        if (this.minValue !== null && this.minValue !== undefined) {
            this.needOnChange = true;
            const numberValue = Number(this.formattedValue.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, ''));
            if (this.previousValue) {
                if (numberValue < this.previousValue && numberValue < this.minValue) {
                    this.el.nativeElement.value = this.formatNumber(this.minValue.toString());
                    this.onChange(this.minValue);
                }
                this.needOnChange = false;
            }
        }
        if (this.needOnChange) {
            this.el.nativeElement.classList.remove('invalid');
            if (CurrencyNumberDirective.integerFormat == ',') {
                this.onChange(Number(this.formattedValue.replace(/,/g, '')));
            }
            else {
                this.onChange(parseFloat(this.formattedValue.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '').replace(',', '.')));
            }
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.el.nativeElement.disabled = isDisabled;
    }
    onPaste(event) {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedText = clipboardData.getData('text');
        const pattern = /^(\d*\.)?\d+$/;
        if (!pastedText.match(pattern)) {
            event.preventDefault();
        }
    }
    onKeyPress(event) {
        const inputChar = String.fromCharCode(event.keyCode || event.which);
        let regexPattern = new RegExp(`[0-9${CurrencyNumberDirective.decimalFormat}]`);
        if (!inputChar.match(regexPattern)) {
            event.preventDefault();
        }
        else if (inputChar === CurrencyNumberDirective.decimalFormat && this.el.nativeElement.value.includes(CurrencyNumberDirective.decimalFormat)) {
            event.preventDefault();
        }
        this.previousValue = Number(this.el.nativeElement.value.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, ''));
    }
    onKeyDown(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            // Store the value before deletion occurs
            this.previousValue = Number(event.target.value.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, ''));
        }
    }
    onFocus(target) {
        const value = target.value;
        if (this.minValue !== null &&
            this.minValue !== undefined &&
            Number(value.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '')) < this.minValue) {
            this.el.nativeElement.value = this.formatNumber(this.minValue.toString());
            this.onChange(this.minValue);
        }
    }
    formatNumber(value) {
        const parts = value.split(CurrencyNumberDirective.decimalFormat);
        parts[0] = parts[0].replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, CurrencyNumberDirective.integerFormat);
        // parts[0] = parts[0].replace(new RegExp(this.integerFormat, 'g'), '').replace(/\B(?=(\d{3})+(?!\d))/g, this.integerFormat);
        return parts.join(CurrencyNumberDirective.decimalFormat);
    }
    writeValue(value) {
        if (value != null) {
            let formattedValue;
            if (CurrencyNumberDirective.integerFormat == ',') {
                formattedValue = this.formatNumber(value.toString());
            }
            else {
                formattedValue = this.formatNumber(value.toString().replace('.', ','));
            }
            this.el.nativeElement.value = this.roundNumber(formattedValue);
        }
        else {
            this.el.nativeElement.value = null;
        }
    }
}
CurrencyNumberDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CurrencyNumberDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
CurrencyNumberDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: CurrencyNumberDirective, selector: "[jhiCurrencyNumber]", inputs: { numberRound: "numberRound", maxValue: ["maxvalue", "maxValue"], minValue: ["minvalue", "minValue"] }, host: { listeners: { "input": "onInput($event)", "paste": "onPaste($event)", "keypress": "onKeyPress($event)", "keydown": "onKeyDown($event)", "blur": "onFocus($event.target)" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CurrencyNumberDirective),
            multi: true,
        },
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CurrencyNumberDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[jhiCurrencyNumber]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => CurrencyNumberDirective),
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { numberRound: [{
                type: Input,
                args: ['numberRound']
            }], maxValue: [{
                type: Input,
                args: ['maxvalue']
            }], minValue: [{
                type: Input,
                args: ['minvalue']
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onPaste: [{
                type: HostListener,
                args: ['paste', ['$event']]
            }], onKeyPress: [{
                type: HostListener,
                args: ['keypress', ['$event']]
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onFocus: [{
                type: HostListener,
                args: ['blur', ['$event.target']]
            }] } });

class NgSTableFormModule {
}
NgSTableFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgSTableFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormModule, declarations: [NgSTableFormComponent,
        CurrencyNumberDirective], imports: [ReactiveFormsModule,
        CommonModule], exports: [NgSTableFormComponent,
        CurrencyNumberDirective] });
NgSTableFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormModule, imports: [ReactiveFormsModule,
        CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgSTableFormComponent,
                        CurrencyNumberDirective
                    ],
                    imports: [
                        ReactiveFormsModule,
                        CommonModule
                    ],
                    exports: [
                        NgSTableFormComponent,
                        CurrencyNumberDirective
                    ]
                }]
        }] });

/*
 * Public API Surface of ng-s-table-form
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CurrencyNumberDirective, NgSTableFormComponent, NgSTableFormModule, NgSTableFormService };
//# sourceMappingURL=ng-s-table-form.mjs.map
