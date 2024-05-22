import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class NumberFormatPipe {
    getThousandSeparator() {
        const thousandSeparator = localStorage.getItem('thousand');
        return thousandSeparator ? thousandSeparator : ',';
    }
    transform(value, decimalDigits = 6) {
        NumberFormatPipe.integerFormat = this.getThousandSeparator();
        if (!value) {
            return 0;
        }
        if (NumberFormatPipe.integerFormat == ',') {
            const numericValue = parseFloat(value.toString().replace(/,/g, ''));
            if (!isNaN(numericValue)) {
                let formattedValue;
                // Làm tròn đến 6 chữ số thập phân
                const roundedValue = parseFloat(numericValue.toFixed(decimalDigits));
                if (roundedValue % 1 === 0) {
                    // Nếu không có phần thập phân (số là số nguyên), không hiển thị phần thập phân
                    formattedValue = roundedValue.toLocaleString('en-US', { maximumFractionDigits: 0 });
                }
                else {
                    // Hiển thị phần thập phân với số chữ số quy định
                    formattedValue = roundedValue.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: decimalDigits });
                }
                return formattedValue;
            }
        }
        else {
            // Convert the number to a string and split it into parts
            const newValue = value.toFixed(decimalDigits).replace(/(\.\d*?)0+$/, '$1');
            const parts = newValue.split('.');
            // Format the integer part with commas
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            // Join the parts back together
            if (parts[1]) {
                return parts.join(',');
            }
            else {
                return parts[0];
            }
        }
        return '';
    }
}
NumberFormatPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NumberFormatPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NumberFormatPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NumberFormatPipe, name: "numberFormatString" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NumberFormatPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'numberFormatString'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWZvcm1hdC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcy10YWJsZS1mb3JtL3NyYy9saWIvbnVtYmVyLWZvcm1hdC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sZ0JBQWdCO0lBSTNCLG9CQUFvQjtRQUNsQixNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNyRCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQXNCLEVBQUUsZ0JBQXdCLENBQUM7UUFDekQsZ0JBQWdCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzdELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsSUFBSSxnQkFBZ0IsQ0FBQyxhQUFhLElBQUksR0FBRyxFQUFFO1lBQ3pDLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksY0FBc0IsQ0FBQztnQkFDM0Isa0NBQWtDO2dCQUNsQyxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLFlBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMxQiwrRUFBK0U7b0JBQy9FLGNBQWMsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3JGO3FCQUFNO29CQUNMLGlEQUFpRDtvQkFDakQsY0FBYyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7aUJBQzNIO2dCQUNELE9BQU8sY0FBYyxDQUFDO2FBQ3ZCO1NBQ0Y7YUFBTTtZQUNMLHlEQUF5RDtZQUN6RCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0UsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxzQ0FBc0M7WUFDdEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFMUQsK0JBQStCO1lBQy9CLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNaLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtpQkFBTTtnQkFDTCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQjtTQUNGO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs2R0E3Q1UsZ0JBQWdCOzJHQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFINUIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsb0JBQW9CO2lCQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnbnVtYmVyRm9ybWF0U3RyaW5nJ1xufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJGb3JtYXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGxhc3RDb21wYW55OiBhbnk7XG4gIHByaXZhdGUgc3RhdGljIGludGVnZXJGb3JtYXQ6IHN0cmluZztcblxuICBnZXRUaG91c2FuZFNlcGFyYXRvcigpOiBhbnkge1xuICAgIGNvbnN0IHRob3VzYW5kU2VwYXJhdG9yID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rob3VzYW5kJyk7XG4gICAgcmV0dXJuIHRob3VzYW5kU2VwYXJhdG9yID8gdGhvdXNhbmRTZXBhcmF0b3IgOiAnLCc7XG4gIH1cblxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSB8IHVuZGVmaW5lZCwgZGVjaW1hbERpZ2l0czogbnVtYmVyID0gNikge1xuICAgIE51bWJlckZvcm1hdFBpcGUuaW50ZWdlckZvcm1hdCA9IHRoaXMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoKTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKE51bWJlckZvcm1hdFBpcGUuaW50ZWdlckZvcm1hdCA9PSAnLCcpIHtcbiAgICAgIGNvbnN0IG51bWVyaWNWYWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC8sL2csICcnKSk7XG4gICAgICBpZiAoIWlzTmFOKG51bWVyaWNWYWx1ZSkpIHtcbiAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlOiBzdHJpbmc7XG4gICAgICAgIC8vIEzDoG0gdHLDsm4gxJHhur9uIDYgY2jhu68gc+G7kSB0aOG6rXAgcGjDom5cbiAgICAgICAgY29uc3Qgcm91bmRlZFZhbHVlID0gcGFyc2VGbG9hdChudW1lcmljVmFsdWUudG9GaXhlZChkZWNpbWFsRGlnaXRzKSk7XG4gICAgICAgIGlmIChyb3VuZGVkVmFsdWUgJSAxID09PSAwKSB7XG4gICAgICAgICAgLy8gTuG6v3Uga2jDtG5nIGPDsyBwaOG6p24gdGjhuq1wIHBow6JuIChz4buRIGzDoCBz4buRIG5ndXnDqm4pLCBraMO0bmcgaGnhu4NuIHRo4buLIHBo4bqnbiB0aOG6rXAgcGjDom5cbiAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHJvdW5kZWRWYWx1ZS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMCB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBIaeG7g24gdGjhu4sgcGjhuqduIHRo4bqtcCBwaMOibiB24bubaSBz4buRIGNo4buvIHPhu5EgcXV5IMSR4buLbmhcbiAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHJvdW5kZWRWYWx1ZS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMSwgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBkZWNpbWFsRGlnaXRzIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ29udmVydCB0aGUgbnVtYmVyIHRvIGEgc3RyaW5nIGFuZCBzcGxpdCBpdCBpbnRvIHBhcnRzXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHZhbHVlLnRvRml4ZWQoZGVjaW1hbERpZ2l0cykucmVwbGFjZSgvKFxcLlxcZCo/KTArJC8sICckMScpO1xuICAgICAgY29uc3QgcGFydHMgPSBuZXdWYWx1ZS5zcGxpdCgnLicpO1xuICAgICAgLy8gRm9ybWF0IHRoZSBpbnRlZ2VyIHBhcnQgd2l0aCBjb21tYXNcbiAgICAgIHBhcnRzWzBdID0gcGFydHNbMF0ucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJy4nKTtcblxuICAgICAgLy8gSm9pbiB0aGUgcGFydHMgYmFjayB0b2dldGhlclxuICAgICAgaWYgKHBhcnRzWzFdKSB7XG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKCcsJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGFydHNbMF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=