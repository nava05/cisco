import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  questions: any[] = [];
  products: any[] = [];
  orderId = uuid.v4();

  constructor() { }

  ngOnInit(): void {
  }

}
