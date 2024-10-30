import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourDetailPage } from './tour-detail.page';

describe('TourDetailPage', () => {
  let component: TourDetailPage;
  let fixture: ComponentFixture<TourDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
