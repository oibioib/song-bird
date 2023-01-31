import '../css/main.scss';
import { languageChangeFromTo } from './data/language';
import {
  callAllElementsCbs,
  updateIndexPageElement,
  updateLogo,
  updateMenu,
  updateTheme
} from './components/update-components';
import updateIndexBackground from './components/index/index-background';
import {
  getLang,
  getTheme,
  setLang,
  setTheme
} from './services/localstorage';
import selfTest from './self-test';

const pageOptions = {
  page: 'index',
  language: 'ru',
  isDarkTheme: true,
  bgImageNum: 0,
  maxImageNum: 5
};

const elementsHandlers = {
  theme: [updateTheme],
  logo: [updateLogo],
  menu: [updateMenu, changeLanguageHandler, changeThemeHandler],
  index: [updateIndexPageElement]
};

function changeLanguageHandler() {
  const updateElementsCbs = [
    elementsHandlers.menu,
    elementsHandlers.index
  ];

  pageOptions.language = languageChangeFromTo[pageOptions.language];

  callAllElementsCbs(updateElementsCbs, pageOptions);
}

function changeThemeHandler() {
  const updateElementsCbs = [
    elementsHandlers.theme,
    elementsHandlers.menu,
    elementsHandlers.index
  ];

  pageOptions.isDarkTheme = !pageOptions.isDarkTheme;

  callAllElementsCbs(updateElementsCbs, pageOptions);
}

function createPageElements() {
  const createElementsCbs = [
    elementsHandlers.theme,
    elementsHandlers.logo,
    elementsHandlers.menu,
    elementsHandlers.index
  ];

  callAllElementsCbs(createElementsCbs, pageOptions);
}

async function updateBg() {
  const {
    bgImageNum,
    maxImageNum
  } = pageOptions;

  const currentImageNum = bgImageNum % (maxImageNum + 1);

  await updateIndexBackground(currentImageNum, document.body);
  pageOptions.bgImageNum = currentImageNum + 1;
  setTimeout(updateBg, 4000);
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

window.addEventListener('DOMContentLoaded', updateBg);
window.addEventListener('beforeunload', beforeUnloadHandler);
window.addEventListener('load', onLoadHandler);

selfTest();
