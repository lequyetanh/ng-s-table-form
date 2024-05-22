import { Directive, ElementRef, HostListener, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[jhiCurrencyNumber]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyNumberDirective),
      multi: true,
    },
  ],
})
export class CurrencyNumberDirective implements ControlValueAccessor{
  @Input('numberRound') numberRound;
  @Input('maxvalue') maxValue?: number;
  @Input('minvalue') minValue?: number;

  private static integerFormat: string;
  private static decimalFormat: string;
  private static reGexGetIntegerSymbol;

  constructor(private el: ElementRef) {}
  previousValue: any = null;
  needOnChange: any = true;

  private formattedValue: string;
  private onChange: (value: any) => void;
  private onTouched: () => void;

  ngOnInit() {
    CurrencyNumberDirective.integerFormat = this.getThousandSeparator();
    CurrencyNumberDirective.decimalFormat = this.getDecimalSeparator();
    CurrencyNumberDirective.reGexGetIntegerSymbol = new RegExp(
      CurrencyNumberDirective.integerFormat.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
      'g'
    );
    // Format và làm tròn khi khởi tạo
    this.el.nativeElement.setAttribute('autocomplete', 'off');
    this.writeValue(this.el.nativeElement.value);
  }

  getThousandSeparator(): any {
    const thousandSeparator = localStorage.getItem('thousand');
    return thousandSeparator ? thousandSeparator : ',';
  }

  getDecimalSeparator(): any {
    const decimalSeparator = localStorage.getItem('decimal');
    return decimalSeparator ? decimalSeparator : '.';
  }

  roundNumber(value: string) {
    if (this.numberRound >= 0) {
      let parts = value.split(CurrencyNumberDirective.decimalFormat);
      if (parts[1] && parts[1].length > this.numberRound) {
        if (this.numberRound > 0) {
          parts[1] = parseFloat(`0.${parts[1]}`).toFixed(this.numberRound).slice(2);
        } else {
          return Math.round(parseFloat(value)).toString();
        }
      }
      return parts.join(CurrencyNumberDirective.decimalFormat);
    } else {
      return value;
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    let inputValue = (event.target as HTMLInputElement).value;

    if (
      inputValue !== '0' &&
      inputValue?.charCodeAt(0) === 48 &&
      inputValue?.charCodeAt(1) !== (CurrencyNumberDirective.integerFormat == ',' ? 46 : 44)
    ) {
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
    } else if (lastChar === CurrencyNumberDirective.decimalFormat && !inputValue.slice(0, -1).includes(CurrencyNumberDirective.decimalFormat)) {
      this.formattedValue = this.formatNumber(inputValue.slice(0, -1)) + CurrencyNumberDirective.decimalFormat;
    } else {
      const newValue = inputValue.slice(0, -1);
      this.formattedValue = this.formatNumber(newValue);
    }
    this.formattedValue = this.roundNumber(this.formattedValue);
    (event.target as HTMLInputElement).value = this.formattedValue;
    if (CurrencyNumberDirective.integerFormat == ',') {
      this.onChange(Number(this.formattedValue.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '')));
    } else {
      // thay tất cả dấu . = '' rồi thay , = .
      this.onChange(parseFloat(this.formattedValue.replace(/\./g, '').replace(',', '.')));
    }

    if (this.maxValue !== null && this.maxValue !== undefined) {
      let regexPattern = new RegExp(`[0-9${CurrencyNumberDirective.decimalFormat}]`);
      let numberValue;
      if (CurrencyNumberDirective.integerFormat == ',') {
        numberValue = Number(this.formattedValue.replace(/,/g, ''));
      } else {
        numberValue = parseFloat(this.formattedValue.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '').replace(',', '.'));
      }
      if (numberValue > this.maxValue) {
        // Nếu giá trị nhập vào lớn hơn max value
        if (CurrencyNumberDirective.integerFormat == ',') {
          this.el.nativeElement.value = this.formatNumber(this.maxValue.toString());
        } else {
          this.el.nativeElement.value = this.formatNumber(this.maxValue.toString().replace('.', ','));
        }
        this.onChange(this.maxValue);
        this.needOnChange = false;
      } else if (numberValue === this.maxValue && (event.data || '').match(regexPattern)) {
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
      } else {
        this.onChange(parseFloat(this.formattedValue.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '').replace(',', '.')));
      }
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    (this.el.nativeElement as HTMLInputElement).disabled = isDisabled;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /^(\d*\.)?\d+$/;
    if (!pastedText.match(pattern)) {
      event.preventDefault();
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode || event.which);
    let regexPattern = new RegExp(`[0-9${CurrencyNumberDirective.decimalFormat}]`);
    if (!inputChar.match(regexPattern)) {
      event.preventDefault();
    } else if (inputChar === CurrencyNumberDirective.decimalFormat && this.el.nativeElement.value.includes(CurrencyNumberDirective.decimalFormat)) {
      event.preventDefault();
    }
    this.previousValue = Number(this.el.nativeElement.value.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, ''));
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      // Store the value before deletion occurs
      this.previousValue = Number((event.target as HTMLInputElement).value.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, ''));
    }
  }

  @HostListener('blur', ['$event.target'])
  onFocus(target: HTMLInputElement): void {
    const value = target.value;
    if (
      this.minValue !== null &&
      this.minValue !== undefined &&
      Number(value.replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '')) < this.minValue
    ) {
      this.el.nativeElement.value = this.formatNumber(this.minValue.toString());
      this.onChange(this.minValue);
    }
  }

  private formatNumber(value: string): string {
    const parts = value.split(CurrencyNumberDirective.decimalFormat);
    parts[0] = parts[0].replace(CurrencyNumberDirective.reGexGetIntegerSymbol, '');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, CurrencyNumberDirective.integerFormat);
    // parts[0] = parts[0].replace(new RegExp(this.integerFormat, 'g'), '').replace(/\B(?=(\d{3})+(?!\d))/g, this.integerFormat);
    return parts.join(CurrencyNumberDirective.decimalFormat);
  }

  writeValue(value: number): void {
    if (value != null) {
      let formattedValue;
      if (CurrencyNumberDirective.integerFormat == ',') {
        formattedValue = this.formatNumber(value.toString());
      } else {
        formattedValue = this.formatNumber(value.toString().replace('.', ','));
      }
      this.el.nativeElement.value = this.roundNumber(formattedValue);
    } else {
      this.el.nativeElement.value = null;
    }
  }
}
