import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (this.isScrolledIntoView(document.getElementById('whyCyber72'))) {
      this.counter("count1", 0, 72, 500, '%');
      this.counter("count2", 0, 1.24, 200, 'm', 0.31, 2);
      this.counter("count3", 0, 74, 500, '%');
      this.counter("count4", 0, 69, 500, '%');
      this.counter("count5", 0, 58, 500, '%');
    }
  }

  isScrolledIntoView(elem) {
    var docViewTop = window.scrollY;
    var docViewBottom = docViewTop + document.body.clientHeight;

    var elemTop = elem.offsetTop;
    var elemBottom = elemTop + elem.clientHeight;

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  counter(id, start, end, duration, symbol, incr?: any, fractionalDigits: number = 0) {
    let obj = document.getElementById(id),
      current = start,
      range = end - start,
      increment = incr ? incr : (end > start ? 1 : -1),
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        current += increment;
        obj.textContent = current.toFixed(fractionalDigits) + ' ' + symbol;
        if (current == end) {
          clearInterval(timer);
        }
      }, step);
  }

}
