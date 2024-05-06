import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSTableFormComponent } from './ng-s-table-form.component';

describe('NgSTableFormComponent', () => {
  let component: NgSTableFormComponent;
  let fixture: ComponentFixture<NgSTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgSTableFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgSTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
