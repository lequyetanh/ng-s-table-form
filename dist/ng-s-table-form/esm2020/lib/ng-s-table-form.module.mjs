import { NgModule } from '@angular/core';
import { NgSTableFormComponent } from './ng-s-table-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyNumberDirective } from './currency-number.directive';
import * as i0 from "@angular/core";
export class NgSTableFormModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcy10YWJsZS1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXMtdGFibGUtZm9ybS9zcmMvbGliL25nLXMtdGFibGUtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBZ0J0RSxNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBWjNCLHFCQUFxQjtRQUNyQix1QkFBdUIsYUFHdkIsbUJBQW1CO1FBQ25CLFlBQVksYUFHWixxQkFBcUI7UUFDckIsdUJBQXVCO2dIQUdkLGtCQUFrQixZQVIzQixtQkFBbUI7UUFDbkIsWUFBWTsyRkFPSCxrQkFBa0I7a0JBZDlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHFCQUFxQjt3QkFDckIsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7d0JBQ3JCLHVCQUF1QjtxQkFDeEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdTVGFibGVGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1zLXRhYmxlLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDdXJyZW5jeU51bWJlckRpcmVjdGl2ZSB9IGZyb20gJy4vY3VycmVuY3ktbnVtYmVyLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nU1RhYmxlRm9ybUNvbXBvbmVudCxcbiAgICBDdXJyZW5jeU51bWJlckRpcmVjdGl2ZVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5nU1RhYmxlRm9ybUNvbXBvbmVudCxcbiAgICBDdXJyZW5jeU51bWJlckRpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nU1RhYmxlRm9ybU1vZHVsZSB7IH1cbiJdfQ==