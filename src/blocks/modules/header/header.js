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

setCurrentDate()


let currentLocation = {
    city: 'California',
    country: 'USA',
    longitude: -118.24,
    latitude: 34.05
 }
 
 let { places } = data
 
 let map = document.querySelector('.surf__world-map');
 let mapContainer = document.querySelector('.surf__map')
 
 let mapPoint = `<g transform="translate(-82.031 -120.58)">
                      <circle cx="94.031" cy="141.58" r="12" fill="#4af6cd" stroke-width=".97472"/>
                   </g>`
 
 let mapPointActive = ` <g transform="translate(-82.031 -120.58)">
                         <g transform="translate(85.371 120.58)" fill="none">
                            <path d="m-3.3403 21c0 6.6274 5.3726 12 12 12 6.6274 0 12-5.3726 12-12s-12-21-12-21-12 14.373-12 21z" clip-rule="evenodd" fill="#4af6cd" fill-rule="evenodd"/>
                         </g>
                      </g>`
 
 
 function slidersInit() {
    $('.shores__slider').slick({
       arrows: true,
       asNavFor: '.shores__nav',
       infinite: true,
       fade: true,
       draggable: true,
       prevArrow: $('.header__icon-arrow_left'),
       nextArrow: $('.header__icon-arrow_right'),
    });
    $('.shores__nav').slick({
       slidesToShow: 4,
       slidesToScroll: 1,
       asNavFor: '.shores__slider',
       focusOnSelect: true
    });
 
 
    $('.shores__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
       let index = nextSlide + 1
       document.querySelector(`.map__path_${currentSlide + 1}`).classList.remove('map__path_active')
       document.querySelector(`.map__point_${currentSlide + 1}`).classList.remove('map__point_active')
       document.querySelector(`.map__destination_${currentSlide + 1}`).classList.remove('map__destination_active')
 
       document.querySelector(`.map__path_${index}`).classList.add('map__path_active')
       document.querySelector(`.map__point_${index}`).classList.add('map__point_active')
       document.querySelector(`.map__destination_${index}`).classList.add('map__destination_active')
    });
 
    $('.surf__dots').on('init', function (event, slick) {
       let currentDot = document.querySelector('.surf__dots .slick-current svg');
       currentDot.innerHTML = mapPointActive;
    });
 
    $('.surf__slider').slick({
       arrows: true,
       slidesToShow: 4,
       slidesToScroll: 1,
       infinite: false,
       // fade: true,
       speed: 150,
       // draggable: true,
       asNavFor: '.surf__dots',
       // centerMode: true,
       // variableWidth: true,
       focusOnSelect: true
    });
    $('.surf__dots').slick({
       slidesToShow: places.length,
       slidesToScroll: 1,
       asNavFor: '.surf__slider',
       focusOnSelect: true
    });
 
    
    $('.surf__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
       // При смене слайда делаем все точки на карте круглыми
       let dots = document.querySelectorAll('.surf__dots .surf__icon-point');
       dots.forEach(item => {
          item.innerHTML = mapPoint
       });
 
       // Удаляем всплывающий попап со страницы
       let popup = document.querySelector('.surf__popup');
       if (popup) popup.remove()
 
       // Для активной точки изменяем иконку
       let currentDot = document.querySelectorAll(`.surf__dots svg`)[nextSlide];
       currentDot.innerHTML = mapPointActive
       
       // Создаём заготовку для попапа и заполняем данными
       let label = document.createElement('div');
       label.classList.add('surf__popup', 'surf-popup');
 
       let { surf, tide, wind } = places[nextSlide].weather;
       
       let addWeatherItem = (type, value) => {
          let icon;
          let measure = 'ft';
          if (type === 'surf') icon = 'wave'
          else if (type === 'tide') icon = 'water'
          else if (type === 'wind') {
             icon = 'wind';
             measure = 'kts'
          };
 
          return `<div class="surf-popup__weather-item">
                <svg class="icon surf-popup__weather-icon">
                   <use xlink: href="svg/sprite.svg#${icon}"></use>
                </svg> <span class="surf-popup__weather-value">${value}</span> <span class="surf-popup__weather-description">${type} (${measure})</span>
             </div >`
       }
 
       label.innerHTML = `
          <span class="surf-popup__title">${places[nextSlide].name}</span>
          <span class="surf-popup__subtitle">${places[nextSlide].country}</span>
          <svg class="icon surf-popup__icon-arrow">
             <use xlink:href="svg/sprite.svg#arrow"></use>
          </svg>
          <div class="surf-popup__weather">
          ${addWeatherItem('surf', `${surf[0]} - ${surf[1]}`)}
          ${addWeatherItem('tide', tide)}
          ${addWeatherItem('wind', `${wind.value} ${wind.direction}`)}
          `
 
       // Добавляем попап на страницу и позиционируем
       mapContainer.appendChild(label);
 
       let { top, left } = currentDot.style;
       label.style.left = left;
       label.style.top = top;
       label.style.transform = `translate(-50%, -${label.offsetHeight + 25}px)`
    });
 }
 
 function setEventListeners() {
    // При изменении размеров окна пересчитываем положение всех точек на карте
    window.addEventListener('resize', resetMapMarkers)
 }
 
 
//  function setCurrentDate() {
//     let month = new Date().getMonth() + 1;
//     let formatedMonth = month < 10 ? `0${month}` : month;
//     document.querySelector('.date__day').innerHTML = new Date().getDate();
//     document.querySelector('.date__small').innerHTML = `${formatedMonth} | ${new Date().getFullYear()}`;
//  }
 
 
 function setCurrentLocation(url) {
    fetch(url)
       .then(res => res.json())
       .then(body => {
          currentLocation = { ...currentLocation, ...body };
          let { longitude, latitude } = currentLocation;
 
          // Устанавливаем актуальные названия города и страны
          changeLocationNames();
 
          // Устанавливаем значок текущего положения
          let name = 'location'
          let marker = `<svg class="icon surf__icon-${name}">
                         <use xlink:href="svg/sprite.svg#${name}"></use>
                      </svg>`
          mapContainer.insertAdjacentHTML('beforeend', marker);
          setMapMarker({longitude, latitude, marker, name});
 
          // Устанавливаем координаты возле карты
 
       })
 }
 
 function changeLocationNames() {
    let { city, country } = currentLocation;
    document.querySelector('.header__city').innerHTML = `${city}`
    document.querySelector('.surf__current').innerHTML = `${city} <span class="title-divider">|</span> ${country}`
 }
 
 function setSliderItems() {
    let slidesContainer = document.querySelector('.surf__slider');
 
    places.forEach((item, i) => {
       // Создаём слайды
       let slide = `
       <div><div class="surf__slide">
          <div class="surf__slide-inner">
             Slide for ${item.city}
          </div>
       </div></div>`
       slidesContainer.insertAdjacentHTML('beforeend', slide)
    })
 }
 
 function setSliderDots() {
    let dotsContainer = document.querySelector('.surf__dots');
 
    places.forEach((item, i) => {
       // Устанавливаем точки курортов на карте
       let name = 'point'
       let marker = `
          <div><svg class="surf__icon-${name}" width="24mm" height="33mm" viewBox="0 0 24 33">
             ${mapPoint}
          </svg></div>`
       let { latitude, longitude } = item
       dotsContainer.insertAdjacentHTML('beforeend', marker);
       setMapMarker({ latitude, longitude, name, i })
    })
 }
 
 
 function setMapMarker({latitude, longitude, name, i = 0}) {
    let point = document.querySelectorAll(`.surf__icon-${name}`)[i];
 
    let posX = (+longitude + 170) * map.width / 360;
    let posY = (83 - +(latitude) * 0.75) * map.height / 130;
 
    point.style.top = posY + 'px';
    point.style.left = posX - 7 + 80 + 'px';
    point.style.display = 'block';
 }
 
 function resetMapMarkers() {
    $('.surf__slider').slick('slickGoTo', 0);
    let popup = document.querySelector('.surf__popup');
    if (popup) popup.remove()
 
    let { latitude, longitude } = currentLocation;
    let name = 'location'
    setMapMarker({longitude, latitude, name});
 
    name = 'point';
    places.forEach((item, i) => {
       let {latitude, longitude} = item
       setMapMarker({longitude, latitude, name, i})
    })
 }
 
 
 setSliderItems();
 setSliderDots();
 slidersInit();
 
 setEventListeners()
 //setCurrentDate();
 setCurrentLocation('http://free.ipwhois.io/json/');
 