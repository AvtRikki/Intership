import Swiper from 'swiper';
import { Manipulation, Grid, Navigation, Pagination, Scrollbar } from 'swiper/modules';

export class SwiperInitializer {
  #SWIPER_DATA_SLIDE = 'swiper-slide';

  constructor(slideClassName) {
    this.slideClassName = slideClassName;
    this.swiper = null;
  }

  #disableLoopState() {
    if (this.swiper.params.loop) {
      this.swiper.params.loop = false;
      this.swiper.update();
    }
  }

  #enableLoopState() {
    if (!this.swiper.params.loop) {
      this.swiper.params.loop = true;
      this.swiper.update();
    }
  }

  initialize(options) {
    const slider = document.querySelector(`.${this.slideClassName}`);
    if (slider) {
      this.swiper = new Swiper(slider, options);
      const slides = document.querySelectorAll(`.${this.#SWIPER_DATA_SLIDE}`);
      slides.forEach((slide) => {
        slide.setAttribute('tabindex', '0');
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          this.#disableLoopState();
        }
      });

      document.addEventListener('keyup', (event) => {
        if (event.key === 'Tab') {
          this.#enableLoopState();
        }
      });

      if (options.navigation) {
        document.querySelector(options.navigation.nextEl).addEventListener('click', this.#enableLoopState.bind(this));
        document.querySelector(options.navigation.prevEl).addEventListener('click', this.#enableLoopState.bind(this));
      }

      return this.swiper;
    }
  }

  createHeroOptions() {
    return {
      modules: [Pagination],
      loop: true,
      pagination: {
        el: '.swiper-slide-active .hero__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'hero__pagination-slide',
        bulletActiveClass: 'hero__pagination-slide--active'
      },
      breakpoints: {
        320: {
          allowTouchMove: true,
        },
        768: {
          allowTouchMove: true,
        },
        1440: {
          allowTouchMove: false,
        },
      },
      on: {
        slideChangeTransitionStart: function () {
          this.pagination.init();
          this.pagination.render();
          this.pagination.update();
        }
      }
    };
  }

  createProgramsOption(scrollbarName, prevSlideClassName, nextSlideClassName) {
    return {
      modules: [Scrollbar, Navigation],
      loop: false,
      keyboard: true,
      scrollbar: {
        el: `.${scrollbarName}`,
        draggable: true,
        dragSize: 392,
      },
      navigation: {
        nextEl: `.${nextSlideClassName}`,
        prevEl: `.${prevSlideClassName}`,
      },
      slidesPerView: 'auto',
      breakpoints: {
        320: {
          spaceBetween: 15,
          scrollbar: {
            enabled: false,
          },
        },
        768: {
          spaceBetween: 30,
          scrollbar: {
            dragSize: 324,
          },
        },
        1440: {
          spaceBetween: 32,
          allowTouchMove: false,
        },
      },
    };
  }

  createNewsOptions(pagesClassName, prevSlideClassName, nextSlideClassName) {
    return {
      modules: [Manipulation, Grid, Navigation, Pagination],
      pagination: {
        el: `.${pagesClassName}`,
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${ className }">${ index + 1 }</span>`;
        },
        bulletClass: 'news__item--bullet',
        bulletActiveClass: 'news__item--bullet-active',
      },
      navigation: {
        nextEl: `.${nextSlideClassName}`,
        prevEl: `.${prevSlideClassName}`,
      },
      observer: true,
      slidesPerView: 'auto',
      slideActiveClass: 'news__item--active',
      slidePrevClass: 'news__item--prev',
      breakpoints: {
        320: {
          spaceBetween: 20,
          grid: {
            rows: 2,
            columns: 'auto',
          },
        },
        768: {
          spaceBetween: 30,
          grid: {
            rows: 2,
            columns: 'auto',
            fill: 'row'
          },
        },
        1440: {
          spaceBetween: 32,
          grid: {
            rows: 1,
            columns: 'auto',
          },
        },
      },
    };
  }

  createReviewsSlider(scrollbarName, prevSlideClassName, nextSlideClassName) {
    return {
      modules: [Scrollbar, Navigation],
      keyboard: true,
      spaceBetween: 20,
      scrollbar: {
        el: `.${scrollbarName}`,
        draggable: true,
        dragSize: 392,
        hide: false,
      },
      navigation: {
        nextEl: `.${nextSlideClassName}`,
        prevEl: `.${prevSlideClassName}`,
      },
      slidesPerView: 'auto',
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 30,
          scrollbar: {
            el: '',
            enabled: false,
          },
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 30,
          scrollbar: {
            dragSize: 324,
          },
        },
        1440: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      },
    };
  }
}
