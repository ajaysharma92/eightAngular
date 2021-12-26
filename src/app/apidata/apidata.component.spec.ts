import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApidataComponent } from './apidata.component';

describe('ApidataComponent', () => {
  let component: ApidataComponent;
  let fixture: ComponentFixture<ApidataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApidataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApidataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
