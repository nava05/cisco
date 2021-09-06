import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductInfoComponent } from '../product-info/product-info.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, AfterViewInit {

  bundleUsers: number = 20;
  bundleCalculatedValue: any;
  activeTab = 'monthly';
  recommendedProducts = [];
  usersInput: any;

  @Input()
  selectedIndex: number = 0;

  @Input()
  products: any[] = [];

  @Output()
  next: EventEmitter<string> = new EventEmitter();

  @Output()
  previous: EventEmitter<string> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngAfterViewInit(): void {
    this.setSlider();
  }

  ngOnInit(): void {
    document.body.scrollIntoView({ behavior: 'smooth' });
    this.setUserInput();
  }

  setUserInput() {
    this.usersInput = {};
    for (let i = 1; i <= 251; i++) {
      this.usersInput[i.toString()] = i.toString();
    }
  }

  updateProduct() {
    for (var prod of this.products) {
      for (var recProd of this.recommendedProducts) {
        if (prod.productName == recProd) {
          prod.recommended = true;
        }
      }
    }
  }

  onNext() {
    this.next.emit();
  }

  onPrevious() {
    this.previous.emit();
  }

  changeHandler(id) {
    for (var prod of this.products) {
      if (prod.productId == id && prod.recommended) {
        prod.recommended = false;
      } else if (prod.productId == id && !prod.recommended) {
        prod.recommended = true;
      }
    }
  }

  get canProceed() {
    return this.products?.some(p => p.recommended);
  }

  filterProducts(products: any[]) {
    return products.filter(p => p.recommended);
  }

  totalPrice(products: any[]) {
    return products.reduce((a, b) => a + +b.price, 0)
  }

  calculateDuoCost(product: any) {
    product.price = (product.user * 100);
  }

  calculateUmbrellaCost(product: any) {
    product.price = (product.user * 37);
  }

  onUsersChange(event) {
    this.products[1].user = event.target.value;
    this.products[2].user = event.target.value;
    this.products[1].price = (event.target.value * 37);
    this.products[2].price = (event.target.value * 100);
  }

  onKeydown(e: any) {
    if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8) || e.keyCode == 48)
      return false;
  }

  onViewInfo(product: any) {
    const modalRef = this.modalService.open(ProductInfoComponent, {
      windowClass: 'info-modal'
    });
    modalRef.componentInstance.product = product;
  }

  evaluateProducts() {
    this.recommendedProducts = [];

    for (var p of this.products) {
      if (p.recommended) {
        this.recommendedProducts.push(p.productName);
      }
      this.activeTab = this.products[0].plan;
    }
  }

  setSlider() {
    const pricingSliders = document.querySelectorAll(".pricing-slider");

    if (pricingSliders.length > 0) {
      for (let i = 0; i < pricingSliders.length; i++) {
        const pricingSlider = pricingSliders[i];

        // Build the input object
        const pricingInput = {
          el: pricingSlider.querySelector("input")
        };
        pricingInput['data'] = this.usersInput
        pricingInput['currentValEl'] = pricingSlider.querySelector(
          ".pricing-slider-value"
        );
        pricingInput['thumbSize'] = parseInt(
          window
            .getComputedStyle(pricingInput['currentValEl'])
            .getPropertyValue("--thumb-size"),
          10
        );

        // Build the output array
        const pricingOutputEls = pricingSlider.parentNode.querySelectorAll(
          ".pricing-item-price"
        );
        const pricingOutput = [];
        for (let i = 0; i < pricingOutputEls.length; i++) {
          const pricingOutputEl = pricingOutputEls[i];
          const pricingOutputObj = {};
          pricingOutputObj['currency'] = pricingOutputEl.querySelector(
            ".pricing-item-price-currency"
          );
          pricingOutputObj['amount'] = pricingOutputEl.querySelector(
            ".pricing-item-price-amount"
          );
          pricingOutputObj['after'] = pricingOutputEl.querySelector(
            ".pricing-item-price-after"
          );
          pricingOutputObj['data'] = JSON.parse(
            pricingOutputEl.getAttribute("data-price-output")
          );
          pricingOutput.push(pricingOutputObj);
        }

        pricingInput.el.setAttribute("min", '1');
        pricingInput.el.setAttribute("max", (Object.keys(pricingInput['data']).length - 1).toString());
        !pricingInput.el.getAttribute("value") &&
          pricingInput.el.setAttribute("value", '1');

        this.handlePricingSlider(pricingInput, pricingOutput);
        window.addEventListener("input", () => {
          this.handlePricingSlider(pricingInput, pricingOutput);
        });
      }
    }
  }

  handlePricingSlider(input, output) {
    // output the current slider value
    if (input.currentValEl)
      input.currentValEl.innerHTML = input.data[input.el.value];
    // update prices
    for (let i = 0; i < output.length; i++) {
      const outputObj = output[i];
      if (outputObj.currency)
        outputObj.currency.innerHTML = outputObj.data[input.el.value][0];
      if (outputObj.amount)
        outputObj.amount.innerHTML = outputObj.data[input.el.value][1];
      if (outputObj.after)
        outputObj.after.innerHTML = outputObj.data[input.el.value][2];
    }
    this.setSliderValuePosition(input);
  }

  setSliderValuePosition(input) {
    const multiplier = input.el.value / input.el.max;
    const thumbOffset = input.thumbSize * multiplier;
    const priceInputOffset =
      (input.thumbSize - input.currentValEl.clientWidth) / 2;
    input.currentValEl.style.left =
      input.el.clientWidth * multiplier - thumbOffset + priceInputOffset + 40 + "px";
  }
}
