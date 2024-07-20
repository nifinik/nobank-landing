'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button =>
  button.addEventListener('click', openModalWindow)
);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Smooth page navigation

// 1 . dobavlayem event listener dlya obwego roditelia
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// Вкладки

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  if (!clickedButton) return;
  // console.log(clickedButton);

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  // Aktiv kontent
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Анимация потускнения на панели навигации

const nav = document.querySelector('.nav');

const navLinkHoverAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this;
    });

    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};

nav.addEventListener('mouseover', navLinkHoverAnimation.bind(0.5));
nav.addEventListener('mouseout', navLinkHoverAnimation.bind(1));

// Sticky navigation

// const section1Coords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Sticky navigation - Intersection observer API
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const getStickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
headerObserver.observe(header);

// Появление частей сайта

const allSections = document.querySelectorAll('section');

const appearanceSection = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.25,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Имплементация lazy loading для изображений

const lazyImages = document.querySelectorAll('img[data-src]');

const loadImages = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.25,
});

lazyImages.forEach(image => lazyImagesObserver.observe(image));

// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     console.log(href);
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const btnZaimScroll = document.querySelector('.zaim--scroll');
// const footer = document.querySelector('.section--sign-up');

// btnZaimScroll.addEventListener('click', function (e) {
//   footer.scrollIntoView({ behavior: 'smooth' });
// });
///////////////////////////////////////////
/// Выбор элементов

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.querySelector('.header'));
// const sections = document.querySelectorAll('.section');
// console.log(sections);

///////////////////////////////////////////
/// Создание и вставка элементов

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent =
//   'Мы используем на этом сайте для улучшения функциональности';
// message.innerHTML =
//   'Мы используем на этом сайте для улучшения функциональности. <button class="btn btn--close-cookie">Ok!</button>';

// const header = document.querySelector('.header');
// header.prepend(message);
// header.after(message);
// header.prepend(message);

// Удаление элементов

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// Стили

// message.style.backgroundColor = '#076785';
// message.style.width = '100%';

// АТрибуты

// const logo = document.querySelector('.nav__logo');
// logo.setAttribute('developer', 'Nurzhigit');
// console.log(logo.getAttribute('src'));
// console.log(logo.getAttribute('developer'));

// Classes

// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

//////////////////////////////////////////////////
// Виды событий и обработчиков событий

// mouseenter
// const h1 = document.querySelector('h1');

// const alertMouseEnter = function (e) {
//   alert('AddEventlistener: You are now at the h1 element');

//   h1.removeEventListener('mouseenter', alertMouseEnter);
// };

// h1.addEventListener('mouseenter', alertMouseEnter);

// const alertMouseEnter = function (e) {
//   alert('AddEventlistener: You are now at the h1 element');
// };

// h1.addEventListener('mouseenter', alertMouseEnter);

// setTimeout(() => h1.removeEventListener('mouseenter', alertMouseEnter), 5000);

// h1.onclick = function (e) {
//   alert('AddEventlistener: You are clicked at the h1 element');
// };

//////////////////////////////////////////////////
// Event propagation

/// DOM traversing (Peremewenie po DOM)

const h1 = document.querySelector('h1');

// Перемещение вниз
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.children);
console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white';

// Перемещение вверх  Closest()
const h2 = document.querySelector('h2');

// h2.closest('h2').style.backgroundColor = 'yellow';
