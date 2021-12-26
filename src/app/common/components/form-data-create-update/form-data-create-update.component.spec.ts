import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataCreateUpdateComponent } from './form-data-create-update.component';

describe('FormDataCreateUpdateComponent', () => {
  let component: FormDataCreateUpdateComponent;
  let fixture: ComponentFixture<FormDataCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDataCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
