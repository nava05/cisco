import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss']
})
export class ShippingDetailsComponent implements OnInit {

  isGetStarted: boolean = false;
  shippingForm: FormGroup;

  @Output()
  next: EventEmitter<string> = new EventEmitter();

  @Output()
  previous: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router) {
    this.isGetStarted = this.router.url.includes('get-started');
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.createForm();
  }

  private createForm() {
    this.shippingForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      country: ['Australia', Validators.required],
      companyName: [null, Validators.required],
      jobTitle: [null, Validators.required],
      businessEmail: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      businessPhone: [null, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      message: [null]
    });
  }

  get f() { return this.shippingForm.controls; }

  onNext() {
    this.next.emit();
  }

  onPrevious() {
    this.previous.emit();
  }
}


