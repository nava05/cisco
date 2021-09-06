import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { PricingComponent } from '../pricing/pricing.component';
import { QuestionnaireComponent } from '../questionnaire/questionnaire.component';
import { ReviewOrderComponent } from '../review-order/review-order.component';
import { ShippingDetailsComponent } from '../shipping-details/shipping-details.component';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit, AfterViewInit, OnDestroy {

  selectedIndex: number = 0;
  isLinear: boolean = true;
  questionnaireFormGroup: FormGroup;
  pricingFormGroup: FormGroup;
  shippingFormGroup: FormGroup;
  reviewFormGroup: FormGroup;

  questions: any[][];
  products: any[] = [];

  @ViewChild('stepper') private stepper: MatHorizontalStepper;
  @ViewChild('questionnaire') public questionnaireComponent: QuestionnaireComponent;
  @ViewChild('pricing') public pricingComponent: PricingComponent;
  @ViewChild('shipping') public shippingComponent: ShippingDetailsComponent;
  @ViewChild('review') public reviewComponent: ReviewOrderComponent;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.questions = data.questions;
      this.products = data.products;
    })
  }

  ngAfterViewInit() {
  }

  onNext() {
    this.stepper.next();
    if (this.stepper.selectedIndex == 1) this.pricingComponent.evaluateProducts();
    if (this.stepper.selectedIndex == 3) this.reviewComponent.setData(this.shippingComponent.shippingForm.value);
  }

  onPrevious() {
    this.stepper.previous();
  }

  onSubmit() { }

  ngOnDestroy(): void {
  }

}
