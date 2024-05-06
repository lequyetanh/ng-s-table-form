import { NgModule } from '@angular/core';
import { NgSTableFormComponent } from './ng-s-table-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgSTableFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    NgSTableFormComponent
  ]
})
export class NgSTableFormModule { }
