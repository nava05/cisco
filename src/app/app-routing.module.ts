import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsResolver } from './resolvers/products.resolver';
import { QuestionsResolver } from './resolvers/questions.resolver';
import { SuccessComponent } from './components/success/success.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { ProductsLayoutComponent } from './components/products-layout/products-layout.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'get-started',
    component: GetStartedComponent,
    resolve: { questions: QuestionsResolver, products: ProductsResolver }
  },
  {
    path: 'products',
    component: ProductsLayoutComponent,
    resolve: { products: ProductsResolver }
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
