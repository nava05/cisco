import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {

  recommendedProducts = [];
  selectedOptions = [];

  @Input()
  questions: any[] = [];

  @Input()
  products: any[] = [];

  @Output()
  next: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  changeHandler(question, option) {
    for (var que of this.questions) {
      if (question.questionId == que.questionId) {
        que.selectedOptionId = option.optionId;
        que.selected = option.productAssociated;
      }
    }
    for (var prod of option.productAssociated) {
      for (var rec of this.products) {
        if (rec.productName == prod) {
          rec.recommended = true;
        }
      }
    }
  }

  onProceed() {
    this.next.emit();
  }

  get canProceed() {
    return this.questions?.every(q => q.selected);
  }

  onCancel() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
  }

}


