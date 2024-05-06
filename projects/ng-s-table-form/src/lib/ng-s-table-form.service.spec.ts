import { TestBed } from '@angular/core/testing';

import { NgSTableFormService } from './ng-s-table-form.service';

describe('NgSTableFormService', () => {
  let service: NgSTableFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgSTableFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
