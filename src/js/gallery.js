import '../css/main.scss';
import { languageChangeFromTo } from './data/language';
import {
  callAllElementsCbs,
  updateGalleryElement,
  updateLogo,
  updateMenu,
  updateTheme
} from './components/update-components';
import {
  getLang,
  getTheme,
  setLang,
  setTheme
} from './services/localstorage';
import birdsData from './data/birds-data';
import selfTest from './self-test';

const pageOptions = {
  page: 'gallery',
  language: 'ru',
  isDarkTheme: true,
  isOverlayOpen: false
};

function updateStateCb(prop, data) {
  pageOptions[prop] = data;
}

const elementsHandlers = {
  theme: [updateTheme],
  logo: [updateLogo],
  menu: [updateMenu, changeLanguageHandler, changeThemeHandler],
  gallery: [
    updateGalleryElement,
    birdsData,
    (data) => updateStateCb('isOverlayOpen', data),
    () => pageOptions.isOverlayOpen
  ]
};

function changeLanguageHandler() {
  const updateElementsCbs = [
    elementsHandlers.menu,
    elementsHandlers.gallery
  ];

  pageOptions.language = languageChangeFromTo[pageOptions.language];

  callAllElementsCbs(updateElementsCbs, pageOptions);
}

function changeThemeHandler() {
  const updateElementsCbs = [
    elementsHandlers.theme,
    elementsHandlers.menu,
    elementsHandlers.gallery
  ];

  pageOptions.isDarkTheme = !pageOptions.isDarkTheme;

  callAllElementsCbs(updateElementsCbs, pageOptions);
}

function createPageElements() {
  const createElementsCbs = [
    elementsHandlers.theme,
    elementsHandlers.logo,
    elementsHandlers.menu,
    elementsHandlers.gallery
  ];

  callAllElementsCbs(createElementsCbs, pageOptions);
}

function beforeUnloadHandler() {
  const {
    language,
    isDarkTheme
  } = pageOptions;

  setLang(language);
  setTheme(isDarkTheme);
}

function onLoadHandler() {
  const language = getLang();
  const isDarkTheme = getTheme();

  if (language) {
    pageOptions.language = language;
  }

  if (isDarkTheme !== undefined) {
    pageOptions.isDarkTheme = isDarkTheme;
  }

  createPageElements();
}

window.addEventListener('beforeunload', beforeUnloadHandler);
window.addEventListener('load', onLoadHandler);

selfTest();
