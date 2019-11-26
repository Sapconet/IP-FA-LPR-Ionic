import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCardComponent } from './img-card.component';

describe('ImgCardComponent', () => {
  let component: ImgCardComponent;
  let fixture: ComponentFixture<ImgCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
