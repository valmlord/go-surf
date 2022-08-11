import $ from 'jquery';
import 'slick-carousel';

$(function () {
    $('.header-slider').slick({
        infinite: true,
        fade: true,
        prevArrow: '<img class="slider-arrows slider-arrows__left" src="../../../img/sprites/arrow-left.svg" alt="arrow-left">',
        nextArrow: '<img class="slider-arrows slider-arrows__right" src="../../../img/sprites/arrow-right.svg" alt="arrow-right">',
        asNavFor: '.slider-dots'
    });

    $('.slider-dots').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        asNavFor: '.header-slider'
    });
});