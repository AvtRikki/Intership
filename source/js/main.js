import { MenuManager } from './modules/navigations/menu-manager.js';
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
import 'swiper/css';

const menuManager = new MenuManager('header');
menuManager.initialize();
