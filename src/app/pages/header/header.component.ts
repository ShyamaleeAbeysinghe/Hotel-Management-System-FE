import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit, OnInit {
  constructor(private navbar: ElementRef) {

  }
  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  scroll = (event: any): void => {
    let navTag = this.navbar.nativeElement.querySelector(".navbar");
    if (window.scrollY > 50) {
      if (!navTag.classList.contains('sticky-top')) {
        navTag.classList.add('sticky-top');
        navTag.classList.add('shadow-sm');
      }
    } else {
      if (navTag.classList.contains('sticky-top')) {
        navTag.classList.remove('sticky-top');
        navTag.classList.remove('shadow-sm');
      }
    }
  };

  ngAfterViewInit(): void {
    //   (function ($) {
    //     "use strict";

    //     // Spinner
    //     var spinner = function () {
    //         setTimeout(function () {
    //             if ($('#spinner').length > 0) {
    //                 $('#spinner').removeClass('show');
    //             }
    //         }, 1);
    //     };
    //     spinner();


    //     // Initiate the wowjs
    //     // new WOW().init();


    //     // Sticky Navbar
    //     $(window).scroll(function () {
    // if ($(this).scrollTop() > 45) {
    // $('.navbar').addClass('sticky-top shadow-sm');
    // } else {
    //     $('.navbar').removeClass('sticky-top shadow-sm');
    // }
    //     });


    //     // Dropdown on mouse hover
    //     const $dropdown = $(".dropdown");
    //     const $dropdownToggle = $(".dropdown-toggle");
    //     const $dropdownMenu = $(".dropdown-menu");
    //     const showClass = "show";

    //     $(window).on("load resize", function() {
    //         if (this.matchMedia("(min-width: 992px)").matches) {
    //             $dropdown.hover(
    //             function() {
    //                 const $this = $(this);
    //                 $this.addClass(showClass);
    //                 $this.find($dropdownToggle).attr("aria-expanded", "true");
    //                 $this.find($dropdownMenu).addClass(showClass);
    //             },
    //             function() {
    //                 const $this = $(this);
    //                 $this.removeClass(showClass);
    //                 $this.find($dropdownToggle).attr("aria-expanded", "false");
    //                 $this.find($dropdownMenu).removeClass(showClass);
    //             }
    //             );
    //         } else {
    //             $dropdown.off("mouseenter mouseleave");
    //         }
    //     });


    //     // Back to top button
    //     $(window).scroll(function () {
    //         if ($(window).scrollTop() > 300) {
    //             $('.back-to-top').fadeIn('slow');
    //         } else {
    //             $('.back-to-top').fadeOut('slow');
    //         }
    //     });
    //     $('.back-to-top').click(function () {
    //         $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    //         return false;
    //     });


    //     // // Testimonials carousel
    //     // $(".testimonial-carousel").owlCarousel({
    //     //     autoplay: true,
    //     //     smartSpeed: 1000,
    //     //     center: true,
    //     //     margin: 24,
    //     //     dots: true,
    //     //     loop: true,
    //     //     nav : false,
    //     //     responsive: {
    //     //         0:{
    //     //             items:1
    //     //         },
    //     //         768:{
    //     //             items:2
    //     //         },
    //     //         992:{
    //     //             items:3
    //     //         }
    //     //     }
    //     // });

    // })(jQuery);


  }

}
