import '../css/main.scss';
import { languageChangeFromTo } from './data/language';
import {
  callAllElementsCbs,
  updateLogo,
  updateMenu,
  updateResults,
  updateTheme
} from './components/update-components';
import {
  clearResultAudioPlayed,
  clearScore,
  getLang,
  getTheme,
  setLang,
  setTheme
} from './services/localstorage';
import selfTest from './self-test';

const pageOptions = {
  page: 'results',
  language: 'ru',
  isDarkTheme: true
};

const elementsHandlers = {
  theme: [updateTheme],
  logo: [updateLogo],
  menu: [updateMenu, changeLanguageHandler, changeThemeHandler],
  results: [updateResults]
};

function changeLanguageHandler() {
  const updateElementsCbs = [
    elementsHandlers.menu,
    elementsHandlers.results
  ];

  pageOptions.language = languageChangeFromTo[pageOptions.language];

  callAllElementsCbs(updateElementsCbs, pageOptions);
}

function changeThemeHandler() {
  const updateElementsCbs = [
    elementsHandlers.theme,
    elementsHandlers.menu,
    elementsHandlers.results
  ];

  pageOptions.isDarkTheme = !pageOptions.isDarkTheme;

  callAllElementsCbs(updateElementsCbs, pageOptions);
}

function createPageElements() {
  const createElementsCbs = [
    elementsHandlers.theme,
    elementsHandlers.logo,
    elementsHandlers.menu,
    elementsHandlers.results
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
  clearScore();
  clearResultAudioPlayed();
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
