import { MenuManager } from './modules/navigations/menu-manager.js';
import 'swiper/css';
import {SwiperInitializer} from './modules/sliders/swiper-initializer.js';

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
