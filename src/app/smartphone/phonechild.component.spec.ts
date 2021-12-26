import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonechildComponent } from './phonechild.component';

describe('PhonechildComponent', () => {
  let component: PhonechildComponent;
  let fixture: ComponentFixture<PhonechildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonechildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonechildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
