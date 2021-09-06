import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { ReviewOrderComponent } from '../review-order/review-order.component';
import { ShippingDetailsComponent } from '../shipping-details/shipping-details.component';

@Component({
  selector: 'app-products-layout',
  templateUrl: './products-layout.component.html',
  styleUrls: ['./products-layout.component.scss']
})
export class ProductsLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  selectedIndex: number = 0;
  isLinear: boolean = true;
  productsFormGroup: FormGroup;
  shippingFormGroup: FormGroup;
  reviewFormGroup: FormGroup;

  allProducts: any[] = [];

  @ViewChild('stepper') private stepper: MatHorizontalStepper;
  @ViewChild('products') public productsComponent: ProductsComponent;
  @ViewChild('shipping') public shippingComponent: ShippingDetailsComponent;
  @ViewChild('review') public reviewComponent: ReviewOrderComponent;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.allProducts = data.products;
    })
  }

  ngAfterViewInit() {
  }

  onNext() {
    this.stepper.next();
    if (this.stepper.selectedIndex == 2) this.reviewComponent.setData(this.shippingComponent.shippingForm.value);
  }

  onPrevious() {
    this.stepper.previous();
  }

  onSubmit() { }

  ngOnDestroy(): void {
  }

}
