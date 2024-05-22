import { NgModule } from '@angular/core';
import { NgSTableFormComponent } from './ng-s-table-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyNumberDirective } from './currency-number.directive';
import { NumberFormatPipe } from './number-format.pipe';
import * as i0 from "@angular/core";
export class NgSTableFormModule {
}
NgSTableFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgSTableFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormModule, declarations: [NgSTableFormComponent,
        CurrencyNumberDirective,
        NumberFormatPipe], imports: [ReactiveFormsModule,
        CommonModule], exports: [NgSTableFormComponent,
        CurrencyNumberDirective,
        NumberFormatPipe] });
NgSTableFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormModule, imports: [ReactiveFormsModule,
        CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NgSTableFormModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcy10YWJsZS1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXMtdGFibGUtZm9ybS9zcmMvbGliL25nLXMtdGFibGUtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBa0J4RCxNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBZDNCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsZ0JBQWdCLGFBR2hCLG1CQUFtQjtRQUNuQixZQUFZLGFBR1oscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2QixnQkFBZ0I7Z0hBR1Asa0JBQWtCLFlBVDNCLG1CQUFtQjtRQUNuQixZQUFZOzJGQVFILGtCQUFrQjtrQkFoQjlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHFCQUFxQjt3QkFDckIsdUJBQXVCO3dCQUN2QixnQkFBZ0I7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLFlBQVk7cUJBQ2I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHFCQUFxQjt3QkFDckIsdUJBQXVCO3dCQUN2QixnQkFBZ0I7cUJBQ2pCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nU1RhYmxlRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vbmctcy10YWJsZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUgfSBmcm9tICcuL2N1cnJlbmN5LW51bWJlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnVtYmVyRm9ybWF0UGlwZSB9IGZyb20gJy4vbnVtYmVyLWZvcm1hdC5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmdTVGFibGVGb3JtQ29tcG9uZW50LFxuICAgIEN1cnJlbmN5TnVtYmVyRGlyZWN0aXZlLFxuICAgIE51bWJlckZvcm1hdFBpcGVcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ1NUYWJsZUZvcm1Db21wb25lbnQsXG4gICAgQ3VycmVuY3lOdW1iZXJEaXJlY3RpdmUsXG4gICAgTnVtYmVyRm9ybWF0UGlwZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nU1RhYmxlRm9ybU1vZHVsZSB7IH1cbiJdfQ==