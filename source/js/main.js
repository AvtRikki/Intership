import { MenuManager } from './modules/navigations/menu-manager.js';
import 'swiper/css';
import {SwiperInitializer} from './modules/sliders/swiper-initializer.js';
import {AccordionMananger} from './modules/accordions/accordion-mananger.js';
import {CustomSelect} from './modules/selectors/custom-select.js';

const menuManager = new MenuManager('header');
menuManager.initialize();

const heroSlider = new SwiperInitializer('hero__slider');
const heroOptions = heroSlider.createHeroOptions();
heroSlider.initialize(heroOptions);

const programsSlider = new SwiperInitializer('programs__slider');
const programsOptions = programsSlider.createProgramsOption(
  'programs__pagination',
  'programs__pagination-prev',
  'programs__pagination-next');
programsSlider.initialize(programsOptions);

const newsSlider = new SwiperInitializer('news__slider');
const newsOptions = newsSlider.createNewsOptions(
  'news__pagination-pages',
  'news__pagination-prev',
  'news__pagination-next');
newsSlider.initialize(newsOptions);

const reviewsSlider = new SwiperInitializer('reviews__slider');
const reviewsOptions = reviewsSlider.createReviewsSlider(
  'reviews__pagination',
  'reviews__pagination-prev',
  'reviews__pagination-next');
reviewsSlider.initialize(reviewsOptions);

const accordionManager = new AccordionMananger('faq__items');
accordionManager.initalize('faq__item');

new CustomSelect('custom-select');
