import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ShippingDetailsComponent } from './components/shipping-details/shipping-details.component';
import { SuccessComponent } from './components/success/success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { ReviewOrderComponent } from './components/review-order/review-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { ProductsLayoutComponent } from './components/products-layout/products-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductInfoComponent } from './components/product-info/product-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PricingComponent,
    ShippingDetailsComponent,
    SuccessComponent,
    ProductsComponent,
    QuestionnaireComponent,
    ContactUsComponent,
    GetStartedComponent,
    ReviewOrderComponent,
    ProductsLayoutComponent,
    ProductInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  entryComponents: [ProductInfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
