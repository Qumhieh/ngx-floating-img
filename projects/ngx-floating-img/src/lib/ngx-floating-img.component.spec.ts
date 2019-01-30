import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFloatingImgComponent } from './ngx-floating-img.component';

describe('NgxFloatingImgComponent', () => {
  let component: NgxFloatingImgComponent;
  let fixture: ComponentFixture<NgxFloatingImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFloatingImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFloatingImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
