/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RevievsComponent } from './revievs.component';

describe('RevievsComponent', () => {
  let component: RevievsComponent;
  let fixture: ComponentFixture<RevievsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevievsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevievsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
