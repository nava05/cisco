import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsLayoutComponent } from './products-layout.component';

describe('ProductsLayoutComponent', () => {
  let component: ProductsLayoutComponent;
  let fixture: ComponentFixture<ProductsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
