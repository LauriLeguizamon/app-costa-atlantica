import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesFormPage } from './sales-form.page';

describe('SalesFormPage', () => {
  let component: SalesFormPage;
  let fixture: ComponentFixture<SalesFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
