import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss']
})
export class ReviewOrderComponent implements OnInit {

  isGetStarted: boolean = false;
  shippingDetails: any;
  couponCode: any = '';

  @Input()
  products: any[];

  @Output()
  submit: EventEmitter<string> = new EventEmitter();

  @Output()
  previous: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router, private activatedroute: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) {
    this.isGetStarted = this.router.url.includes('get-started');
  }

  ngOnInit(): void {
  }

  onPrevious() {
    this.previous.emit();
  }

  onSubmit() {
    this.router.navigate(['success']);
    this.submit.emit();
  }

  filterProducts(products: any[]) {
    return products.filter(p => p.recommended);
  }

  setData(data) {
    this.shippingDetails = data;
  }

  totalPrice(products: any[]) {
    return products.reduce((a, b) => a + +b.price, 0)
  }

  triggerChangeDetection() {
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 1000);
  }
}
