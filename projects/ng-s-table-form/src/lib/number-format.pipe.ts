import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatString'
})
export class NumberFormatPipe implements PipeTransform {
  lastCompany: any;
  private static integerFormat: string;

  getThousandSeparator(): any {
    const thousandSeparator = localStorage.getItem('thousand');
    return thousandSeparator ? thousandSeparator : ',';
  }

  transform(value: any | undefined, decimalDigits: number = 6) {
    NumberFormatPipe.integerFormat = this.getThousandSeparator();
    if (!value) {
      return 0;
    }
    if (NumberFormatPipe.integerFormat == ',') {
      const numericValue = parseFloat(value.toString().replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        let formattedValue: string;
        // Làm tròn đến 6 chữ số thập phân
        const roundedValue = parseFloat(numericValue.toFixed(decimalDigits));
        if (roundedValue % 1 === 0) {
          // Nếu không có phần thập phân (số là số nguyên), không hiển thị phần thập phân
          formattedValue = roundedValue.toLocaleString('en-US', { maximumFractionDigits: 0 });
        } else {
          // Hiển thị phần thập phân với số chữ số quy định
          formattedValue = roundedValue.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: decimalDigits });
        }
        return formattedValue;
      }
    } else {
      // Convert the number to a string and split it into parts
      const newValue = value.toFixed(decimalDigits).replace(/(\.\d*?)0+$/, '$1');
      const parts = newValue.split('.');
      // Format the integer part with commas
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      // Join the parts back together
      if (parts[1]) {
        return parts.join(',');
      } else {
        return parts[0];
      }
    }

    return '';
  }
}
