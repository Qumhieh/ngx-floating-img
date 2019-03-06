import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCodeGeneratorComponent } from './ngx-code-generator.component';

describe('NgxCodeGeneratorComponent', () => {
  let component: NgxCodeGeneratorComponent;
  let fixture: ComponentFixture<NgxCodeGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCodeGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
