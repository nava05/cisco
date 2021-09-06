import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CommonService } from '../services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsResolver implements Resolve<any> {

  constructor(private commonService: CommonService) { }

  resolve() {
    return this.commonService.getQuestions();
  }
}