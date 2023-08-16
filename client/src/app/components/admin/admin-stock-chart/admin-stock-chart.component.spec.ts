import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStockChartComponent } from './admin-stock-chart.component';

describe('AdminStockChartComponent', () => {
  let component: AdminStockChartComponent;
  let fixture: ComponentFixture<AdminStockChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStockChartComponent]
    });
    fixture = TestBed.createComponent(AdminStockChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
