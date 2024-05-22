import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NumberFormatPipe implements PipeTransform {
    lastCompany: any;
    private static integerFormat;
    getThousandSeparator(): any;
    transform(value: any | undefined, decimalDigits?: number): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberFormatPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NumberFormatPipe, "numberFormatString", false>;
}
