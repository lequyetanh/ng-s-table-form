import { Directive, HostListener, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
export class CurrencyNumberDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktbnVtYmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXMtdGFibGUtZm9ybS9zcmMvbGliL2N1cnJlbmN5LW51bWJlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBWXpFLE1BQU0sT0FBTyx1QkFBdUI7SUFTbEMsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDbEMsa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFDMUIsaUJBQVksR0FBUSxJQUFJLENBQUM7SUFGWSxDQUFDO0lBUXRDLFFBQVE7UUFDTix1QkFBdUIsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDcEUsdUJBQXVCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ25FLHVCQUF1QixDQUFDLHFCQUFxQixHQUFHLElBQUksTUFBTSxDQUN4RCx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxFQUMvRSxHQUFHLENBQ0osQ0FBQztRQUNGLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7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R0FBRyxJQUFJLENBQUM7U0FDcEM7SUFDSCxDQUFDOztvSEF0TlUsdUJBQXVCO3dHQUF2Qix1QkFBdUIsbVZBUnZCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDdEQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGOzJGQUVVLHVCQUF1QjtrQkFWbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUM7NEJBQ3RELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGO2lHQUV1QixXQUFXO3NCQUFoQyxLQUFLO3VCQUFDLGFBQWE7Z0JBQ0QsUUFBUTtzQkFBMUIsS0FBSzt1QkFBQyxVQUFVO2dCQUNFLFFBQVE7c0JBQTFCLEtBQUs7dUJBQUMsVUFBVTtnQkFxRGpCLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBaUdqQyxPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVdqQyxVQUFVO3NCQURULFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQWFwQyxTQUFTO3NCQURSLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVNuQyxPQUFPO3NCQUROLFlBQVk7dUJBQUMsTUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2poaUN1cnJlbmN5TnVtYmVyXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcntcbiAgQElucHV0KCdudW1iZXJSb3VuZCcpIG51bWJlclJvdW5kO1xuICBASW5wdXQoJ21heHZhbHVlJykgbWF4VmFsdWU/OiBudW1iZXI7XG4gIEBJbnB1dCgnbWludmFsdWUnKSBtaW5WYWx1ZT86IG51bWJlcjtcblxuICBwcml2YXRlIHN0YXRpYyBpbnRlZ2VyRm9ybWF0OiBzdHJpbmc7XG4gIHByaXZhdGUgc3RhdGljIGRlY2ltYWxGb3JtYXQ6IHN0cmluZztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVHZXhHZXRJbnRlZ2VyU3ltYm9sO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG4gIHByZXZpb3VzVmFsdWU6IGFueSA9IG51bGw7XG4gIG5lZWRPbkNoYW5nZTogYW55ID0gdHJ1ZTtcblxuICBwcml2YXRlIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5pbnRlZ2VyRm9ybWF0ID0gdGhpcy5nZXRUaG91c2FuZFNlcGFyYXRvcigpO1xuICAgIEN1cnJlbmN5TnVtYmVyRGlyZWN0aXZlLmRlY2ltYWxGb3JtYXQgPSB0aGlzLmdldERlY2ltYWxTZXBhcmF0b3IoKTtcbiAgICBDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5yZUdleEdldEludGVnZXJTeW1ib2wgPSBuZXcgUmVnRXhwKFxuICAgICAgQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuaW50ZWdlckZvcm1hdC5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKSxcbiAgICAgICdnJ1xuICAgICk7XG4gICAgLy8gRm9ybWF0IHbDoCBsw6BtIHRyw7JuIGtoaSBraOG7n2kgdOG6oW9cbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XG4gICAgdGhpcy53cml0ZVZhbHVlKHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gIH1cblxuICBnZXRUaG91c2FuZFNlcGFyYXRvcigpOiBhbnkge1xuICAgIGNvbnN0IHRob3VzYW5kU2VwYXJhdG9yID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rob3VzYW5kJyk7XG4gICAgcmV0dXJuIHRob3VzYW5kU2VwYXJhdG9yID8gdGhvdXNhbmRTZXBhcmF0b3IgOiAnLCc7XG4gIH1cblxuICBnZXREZWNpbWFsU2VwYXJhdG9yKCk6IGFueSB7XG4gICAgY29uc3QgZGVjaW1hbFNlcGFyYXRvciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZWNpbWFsJyk7XG4gICAgcmV0dXJuIGRlY2ltYWxTZXBhcmF0b3IgPyBkZWNpbWFsU2VwYXJhdG9yIDogJy4nO1xuICB9XG5cbiAgcm91bmROdW1iZXIodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm51bWJlclJvdW5kID49IDApIHtcbiAgICAgIGxldCBwYXJ0cyA9IHZhbHVlLnNwbGl0KEN1cnJlbmN5TnVtYmVyRGlyZWN0aXZlLmRlY2ltYWxGb3JtYXQpO1xuICAgICAgaWYgKHBhcnRzWzFdICYmIHBhcnRzWzFdLmxlbmd0aCA+IHRoaXMubnVtYmVyUm91bmQpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtYmVyUm91bmQgPiAwKSB7XG4gICAgICAgICAgcGFydHNbMV0gPSBwYXJzZUZsb2F0KGAwLiR7cGFydHNbMV19YCkudG9GaXhlZCh0aGlzLm51bWJlclJvdW5kKS5zbGljZSgyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChwYXJzZUZsb2F0KHZhbHVlKSkudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuZGVjaW1hbEZvcm1hdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIG9uSW5wdXQoZXZlbnQ6IElucHV0RXZlbnQpIHtcbiAgICBsZXQgaW5wdXRWYWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG5cbiAgICBpZiAoXG4gICAgICBpbnB1dFZhbHVlICE9PSAnMCcgJiZcbiAgICAgIGlucHV0VmFsdWU/LmNoYXJDb2RlQXQoMCkgPT09IDQ4ICYmXG4gICAgICBpbnB1dFZhbHVlPy5jaGFyQ29kZUF0KDEpICE9PSAoQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuaW50ZWdlckZvcm1hdCA9PSAnLCcgPyA0NiA6IDQ0KVxuICAgICkge1xuICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgaWYgKGlucHV0VmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIGlucHV0VmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IChpbnB1dFZhbHVlLnRyaW0oKSA9PT0gJycgJiYgaW5wdXRWYWx1ZSAhPT0gJzAnKSkge1xuICAgICAgdGhpcy5vbkNoYW5nZSgnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBkb3RJbmRleCA9IGlucHV0VmFsdWUuaW5kZXhPZihDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5kZWNpbWFsRm9ybWF0KTtcbiAgICBpZiAoZG90SW5kZXggPj0gMCAmJiB0aGlzLm51bWJlclJvdW5kKSB7XG4gICAgICBpZiAoaW5wdXRWYWx1ZS5sZW5ndGggLSAxIC0gZG90SW5kZXggPiB0aGlzLm51bWJlclJvdW5kKSB7XG4gICAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBkb3RJbmRleCArIHRoaXMubnVtYmVyUm91bmQgKyAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsYXN0Q2hhciA9IGlucHV0VmFsdWVbaW5wdXRWYWx1ZS5sZW5ndGggLSAxXTtcbiAgICBpZiAobGFzdENoYXIubWF0Y2goL1swLTldLykpIHtcbiAgICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdE51bWJlcihpbnB1dFZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGxhc3RDaGFyID09PSBDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5kZWNpbWFsRm9ybWF0ICYmICFpbnB1dFZhbHVlLnNsaWNlKDAsIC0xKS5pbmNsdWRlcyhDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5kZWNpbWFsRm9ybWF0KSkge1xuICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0TnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoMCwgLTEpKSArIEN1cnJlbmN5TnVtYmVyRGlyZWN0aXZlLmRlY2ltYWxGb3JtYXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gaW5wdXRWYWx1ZS5zbGljZSgwLCAtMSk7XG4gICAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXROdW1iZXIobmV3VmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gdGhpcy5yb3VuZE51bWJlcih0aGlzLmZvcm1hdHRlZFZhbHVlKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZTtcbiAgICBpZiAoQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuaW50ZWdlckZvcm1hdCA9PSAnLCcpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoTnVtYmVyKHRoaXMuZm9ybWF0dGVkVmFsdWUucmVwbGFjZShDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5yZUdleEdldEludGVnZXJTeW1ib2wsICcnKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGF5IHThuqV0IGPhuqMgZOG6pXUgLiA9ICcnIHLhu5NpIHRoYXkgLCA9IC5cbiAgICAgIHRoaXMub25DaGFuZ2UocGFyc2VGbG9hdCh0aGlzLmZvcm1hdHRlZFZhbHVlLnJlcGxhY2UoL1xcLi9nLCAnJykucmVwbGFjZSgnLCcsICcuJykpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXhWYWx1ZSAhPT0gbnVsbCAmJiB0aGlzLm1heFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCByZWdleFBhdHRlcm4gPSBuZXcgUmVnRXhwKGBbMC05JHtDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5kZWNpbWFsRm9ybWF0fV1gKTtcbiAgICAgIGxldCBudW1iZXJWYWx1ZTtcbiAgICAgIGlmIChDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5pbnRlZ2VyRm9ybWF0ID09ICcsJykge1xuICAgICAgICBudW1iZXJWYWx1ZSA9IE51bWJlcih0aGlzLmZvcm1hdHRlZFZhbHVlLnJlcGxhY2UoLywvZywgJycpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG51bWJlclZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLmZvcm1hdHRlZFZhbHVlLnJlcGxhY2UoQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUucmVHZXhHZXRJbnRlZ2VyU3ltYm9sLCAnJykucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgfVxuICAgICAgaWYgKG51bWJlclZhbHVlID4gdGhpcy5tYXhWYWx1ZSkge1xuICAgICAgICAvLyBO4bq/dSBnacOhIHRy4buLIG5o4bqtcCB2w6BvIGzhu5tuIGjGoW4gbWF4IHZhbHVlXG4gICAgICAgIGlmIChDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5pbnRlZ2VyRm9ybWF0ID09ICcsJykge1xuICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZm9ybWF0TnVtYmVyKHRoaXMubWF4VmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5mb3JtYXROdW1iZXIodGhpcy5tYXhWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoJy4nLCAnLCcpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMubWF4VmFsdWUpO1xuICAgICAgICB0aGlzLm5lZWRPbkNoYW5nZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChudW1iZXJWYWx1ZSA9PT0gdGhpcy5tYXhWYWx1ZSAmJiAoZXZlbnQuZGF0YSB8fCAnJykubWF0Y2gocmVnZXhQYXR0ZXJuKSkge1xuICAgICAgICAvLyBO4bq/dSBnacOhIHRy4buLIG5o4bqtcCB2w6BvIGLhurFuZyBtYXggdmFsdWUgdsOgIG5nxrDhu51pIGTDuW5nIHbhuqtuIMSRYW5nIHRow6ptIGPDoWMgc+G7kSBraMOhY1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5taW5WYWx1ZSAhPT0gbnVsbCAmJiB0aGlzLm1pblZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubmVlZE9uQ2hhbmdlID0gdHJ1ZTtcbiAgICAgIGNvbnN0IG51bWJlclZhbHVlID0gTnVtYmVyKHRoaXMuZm9ybWF0dGVkVmFsdWUucmVwbGFjZShDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5yZUdleEdldEludGVnZXJTeW1ib2wsICcnKSk7XG4gICAgICBpZiAodGhpcy5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIGlmIChudW1iZXJWYWx1ZSA8IHRoaXMucHJldmlvdXNWYWx1ZSAmJiBudW1iZXJWYWx1ZSA8IHRoaXMubWluVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdE51bWJlcih0aGlzLm1pblZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5taW5WYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uZWVkT25DaGFuZ2UgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMubmVlZE9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZCcpO1xuICAgICAgaWYgKEN1cnJlbmN5TnVtYmVyRGlyZWN0aXZlLmludGVnZXJGb3JtYXQgPT0gJywnKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoTnVtYmVyKHRoaXMuZm9ybWF0dGVkVmFsdWUucmVwbGFjZSgvLC9nLCAnJykpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UocGFyc2VGbG9hdCh0aGlzLmZvcm1hdHRlZFZhbHVlLnJlcGxhY2UoQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUucmVHZXhHZXRJbnRlZ2VyU3ltYm9sLCAnJykucmVwbGFjZSgnLCcsICcuJykpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAodGhpcy5lbC5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3Bhc3RlJywgWyckZXZlbnQnXSlcbiAgb25QYXN0ZShldmVudDogQ2xpcGJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCAod2luZG93IGFzIGFueSkuY2xpcGJvYXJkRGF0YTtcbiAgICBjb25zdCBwYXN0ZWRUZXh0ID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XG4gICAgY29uc3QgcGF0dGVybiA9IC9eKFxcZCpcXC4pP1xcZCskLztcbiAgICBpZiAoIXBhc3RlZFRleHQubWF0Y2gocGF0dGVybikpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudCddKVxuICBvbktleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgaW5wdXRDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoKTtcbiAgICBsZXQgcmVnZXhQYXR0ZXJuID0gbmV3IFJlZ0V4cChgWzAtOSR7Q3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuZGVjaW1hbEZvcm1hdH1dYCk7XG4gICAgaWYgKCFpbnB1dENoYXIubWF0Y2gocmVnZXhQYXR0ZXJuKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2UgaWYgKGlucHV0Q2hhciA9PT0gQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuZGVjaW1hbEZvcm1hdCAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUuaW5jbHVkZXMoQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuZGVjaW1hbEZvcm1hdCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IE51bWJlcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUucmVwbGFjZShDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5yZUdleEdldEludGVnZXJTeW1ib2wsICcnKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0JhY2tzcGFjZScgfHwgZXZlbnQua2V5ID09PSAnRGVsZXRlJykge1xuICAgICAgLy8gU3RvcmUgdGhlIHZhbHVlIGJlZm9yZSBkZWxldGlvbiBvY2N1cnNcbiAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IE51bWJlcigoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnJlcGxhY2UoQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUucmVHZXhHZXRJbnRlZ2VyU3ltYm9sLCAnJykpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25Gb2N1cyh0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC52YWx1ZTtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1pblZhbHVlICE9PSBudWxsICYmXG4gICAgICB0aGlzLm1pblZhbHVlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIE51bWJlcih2YWx1ZS5yZXBsYWNlKEN1cnJlbmN5TnVtYmVyRGlyZWN0aXZlLnJlR2V4R2V0SW50ZWdlclN5bWJvbCwgJycpKSA8IHRoaXMubWluVmFsdWVcbiAgICApIHtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZm9ybWF0TnVtYmVyKHRoaXMubWluVmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMubWluVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0TnVtYmVyKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuZGVjaW1hbEZvcm1hdCk7XG4gICAgcGFydHNbMF0gPSBwYXJ0c1swXS5yZXBsYWNlKEN1cnJlbmN5TnVtYmVyRGlyZWN0aXZlLnJlR2V4R2V0SW50ZWdlclN5bWJvbCwgJycpO1xuICAgIHBhcnRzWzBdID0gcGFydHNbMF0ucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuaW50ZWdlckZvcm1hdCk7XG4gICAgLy8gcGFydHNbMF0gPSBwYXJ0c1swXS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5pbnRlZ2VyRm9ybWF0LCAnZycpLCAnJykucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgdGhpcy5pbnRlZ2VyRm9ybWF0KTtcbiAgICByZXR1cm4gcGFydHMuam9pbihDdXJyZW5jeU51bWJlckRpcmVjdGl2ZS5kZWNpbWFsRm9ybWF0KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBsZXQgZm9ybWF0dGVkVmFsdWU7XG4gICAgICBpZiAoQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUuaW50ZWdlckZvcm1hdCA9PSAnLCcpIHtcbiAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdE51bWJlcih2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKCcuJywgJywnKSk7XG4gICAgICB9XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnJvdW5kTnVtYmVyKGZvcm1hdHRlZFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==