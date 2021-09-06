import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  STORAGE_KEY_QUESTION = 'local_question_json';
  STORAGE_KEY_PRODUCT = 'local_product_json';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`assets/data/questionnaire.json`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`assets/data/product.json`);
  }

  public storeQuestionsOnLocalStorage(questions: any[]): void {
    localStorage.setItem(this.STORAGE_KEY_QUESTION, JSON.stringify(questions));
  }

  public getQuestionsFromLocalStorage() {
    return localStorage.getItem(this.STORAGE_KEY_QUESTION);
  }

  public storeProductsOnLocalStorage(products: any[]): void {
    localStorage.setItem(this.STORAGE_KEY_PRODUCT, JSON.stringify(products));
  }

  public getProductsFromLocalStorage() {
    return localStorage.getItem(this.STORAGE_KEY_PRODUCT);
  }

  public resetLocalStorage() {
    localStorage.clear();
  }

  public loadInitialData() {
    const questions = !this.getQuestionsFromLocalStorage() ? [] : JSON.parse(this.getQuestionsFromLocalStorage());
    const products = !this.getProductsFromLocalStorage() ? [] : JSON.parse(this.getProductsFromLocalStorage());

    if (!questions?.length)
      this.getQuestions().subscribe(response => {
        this.storeQuestionsOnLocalStorage(response);
      });

    if (!products?.length)
      this.getProducts().subscribe(response => {
        this.storeProductsOnLocalStorage(response);
      });
  }
}
