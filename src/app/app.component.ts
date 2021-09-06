import * as jQuery from 'jquery';
import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollSpy } from 'bootstrap';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  navbarShrink() {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible?.classList.remove('navbar-shrink')
    } else {
      navbarCollapsible?.classList.add('navbar-shrink')
    }
  };

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
  }

  ngOnInit(): void {

    AOS.init();
    
    this.navbarShrink();

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler') as HTMLElement;
    const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map((responsiveNavItem) => {
      responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });

    $(document).ready(function () {
      $('#popContent').on('shown.bs.modal', function () {
        let audioPlayer = <HTMLVideoElement>document.getElementById('trial-video');
        audioPlayer.play();
      })
      $('#popContent').on('hidden.bs.modal', function () {
        let audioPlayer = <HTMLVideoElement>document.getElementById('trial-video');
        audioPlayer.pause();
      })
    })
  }
}
