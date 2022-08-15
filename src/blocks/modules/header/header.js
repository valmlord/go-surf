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

function setCurrentDate() {
   let month = new Date().getMonth() + 1;
   let formatedMonth = month < 10 ? `0${month}` : month;
   document.querySelector('.header-aside__date-day').innerHTML = new Date().getDate();
   document.querySelector('.header-aside__date-year').innerHTML = `${formatedMonth} | ${new Date().getFullYear()}`;
}

let currentLocation = {
   city: 'Avsallar',
   country: 'Turkey',
   longitude: 36.62,
   latitude: 31.76
}

function setCurrentLocation(url) {
   fetch(url)
      .then(res => res.json())
      .then(body => {
         currentLocation = { ...currentLocation, ...body };
         changeLocationNames();
      })
}

function changeLocationNames() {
   let { city } = currentLocation;
   document.querySelector('.header-aside__location-current').innerHTML = `${city}`
}

setCurrentDate();
setCurrentLocation('http://free.ipwhois.io/json/');