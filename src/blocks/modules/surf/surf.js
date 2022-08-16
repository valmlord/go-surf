import $ from 'jquery';
import 'slick-carousel';

$(function () {
   $('.surf-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: '<img class="slider-arrows slider-arrows__left" src="../../../img/sprites/arrow-left.svg" alt="arrow-left">',
      nextArrow: '<img class="slider-arrows slider-arrows__right" src="../../../img/sprites/arrow-right.svg" alt="arrow-right">',
      asNavFor: '.surf-slider__map'
   });
});

$(function () {
   $('.surf-slider__map').slick({
      slidesToShow: 8,
      slidesToScroll: 1,
      arrow: false,
      asNavFor: '.surf-slider',
      focusOnSelect: true,
   });
});
