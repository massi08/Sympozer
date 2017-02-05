/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonByNameComponent } from './person-by-name.component';

describe('PersonByNameComponent', () => {
  let component: PersonByNameComponent;
  let fixture: ComponentFixture<PersonByNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonByNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
