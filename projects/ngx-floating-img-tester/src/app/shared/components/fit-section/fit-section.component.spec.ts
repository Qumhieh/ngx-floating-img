import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitSectionComponent } from './fit-section.component';

describe('FitSectionComponent', () => {
  let component: FitSectionComponent;
  let fixture: ComponentFixture<FitSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
