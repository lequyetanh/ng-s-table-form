import { NgModule } from '@angular/core';
import { NgSTableFormComponent } from './ng-s-table-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyNumberDirective } from './currency-number.directive';
import { NumberFormatPipe } from './number-format.pipe';

@NgModule({
  declarations: [
    NgSTableFormComponent,
    CurrencyNumberDirective,
    NumberFormatPipe
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    NgSTableFormComponent,
    CurrencyNumberDirective,
    NumberFormatPipe
  ]
})
export class NgSTableFormModule { }
