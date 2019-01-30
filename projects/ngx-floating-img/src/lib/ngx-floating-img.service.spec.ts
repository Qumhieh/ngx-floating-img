import { TestBed } from '@angular/core/testing';

import { NgxFloatingImgService } from './ngx-floating-img.service';

describe('NgxFloatingImgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFloatingImgService = TestBed.get(NgxFloatingImgService);
    expect(service).toBeTruthy();
  });
});
