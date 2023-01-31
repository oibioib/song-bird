import renderLogo from './header/header-logo';
import renderScore from './header/header-score';
import renderButtons from './header/header-buttons';
import renderSteps from './game/game-steps';
import renderAnswers from './game/game-answers';
import renderNext from './game/game-next';
import { renderQuestionAudio, renderQuestionImage, renderQuestionTitle } from './game/game-question';
import {
  renderInfoAudio,
  renderInfoDescription,
  renderInfoImage,
  renderInfoOverflow,
  renderInfoTitle
} from './game/game-info';
import renderIndexPageElement from './index/index-info';
import renderGallery from './gallery/gallery-birds';
import renderResults from './results/results-info';

const documentBody = document.body;
const headerLogoElement = document.querySelector('.header__logo');
const headerScoreElement = document.querySelector('.header__score');
const headerButtonsElement = document.querySelector('.header__buttons');
const gameQuestionImageElement = document.querySelector('.game__question-img');
const gameQuestionTitleElement = document.querySelector('.game__question-title');
const gameQuestionAudioElement = document.querySelector('.game__question-audio');
const gameStepsElement = document.querySelector('.game__steps');
const gameAnswersElement = document.querySelector('.game__answers');
const gameInfoImageElement = document.querySelector('.game__info-img');
const gameInfoTitleElement = document.querySelector('.game__info-title');
const gameInfoDescriptionElement = document.querySelector('.game__info-description');
const gameInfoAudioElement = document.querySelector('.game__info-audio');
const gameInfoOverflowElement = document.querySelector('.game__info-overflow');
const gameNextElement = document.querySelector('.game__next');
const indexPageMainElement = document.querySelector('.index__block');
const galleryBirdsListElement = document.querySelector('.gallery__list');
const resultsMainElement = document.querySelector('.results');

export function updateTheme(pageOptions) {
  const {
    isDarkTheme
  } = pageOptions;

  if (isDarkTheme) documentBody.classList.remove('light');
  if (!isDarkTheme) documentBody.classList.add('light');
}

export function updateLogo(pageOptions) {
  renderLogo(pageOptions, headerLogoElement);
}

export function updateMenu(pageOptions, changeLanguageHandler, changeThemeHandler) {
  renderButtons({
    pageOptions,
    parentElement: headerButtonsElement,
    changeLanguageHandler,
    changeThemeHandler
  });
}

export function updateScore(pageOptions) {
  renderScore(pageOptions, headerScoreElement);
}

export function updateSteps(pageOptions, data) {
  renderSteps(pageOptions, data, gameStepsElement);
}

export function updateNext(pageOptions, clickNextHandler) {
  renderNext(pageOptions, clickNextHandler, gameNextElement);
}

export function updateQuestionImage(pageOptions, stepsData) {
  renderQuestionImage(pageOptions, stepsData, gameQuestionImageElement);
}

export function updateQuestionTitle(pageOptions, stepsData) {
  renderQuestionTitle(pageOptions, stepsData, gameQuestionTitleElement);
}

export function updateQuestionAudio(pageOptions, stepsData, getCurrentStep, questionAudioStopCb, questionAudioPauseCb) {
  const options = {
    gameOptions: pageOptions,
    stepsData,
    getCurrentStep,
    questionAudioStopCb,
    questionAudioPauseCb,
    parentElement: gameQuestionAudioElement
  };

  renderQuestionAudio(options);
}

export function updateAnswers(pageOptions, stepsData, selectAnswerHandler, showInfoHandler) {
  const options = {
    gameOptions: pageOptions,
    stepsData,
    selectAnswerHandler,
    showInfoHandler,
    parentElement: gameAnswersElement
  };

  renderAnswers(options);
}

export function updateInfoImage(pageOptions, stepsData) {
  renderInfoImage(pageOptions, stepsData, gameInfoImageElement);
}

export function updateInfoTitle(pageOptions, stepsData) {
  renderInfoTitle(pageOptions, stepsData, gameInfoTitleElement);
}

export function updateInfoDescription(pageOptions, stepsData) {
  renderInfoDescription(pageOptions, stepsData, gameInfoDescriptionElement);
}

export function updateInfoAudio(pageOptions, stepsData, infoAudioStopCb) {
  const options = {
    gameOptions: pageOptions,
    stepsData,
    infoAudioStopCb,
    parentElement: gameInfoAudioElement
  };

  renderInfoAudio(options);
}

export function updateIndexPageElement(pageOptions) {
  renderIndexPageElement(pageOptions, indexPageMainElement);
}

export function updateInfoOverflow(pageOptions) {
  renderInfoOverflow(pageOptions, gameInfoOverflowElement);
}

// eslint-disable-next-line max-len
export function updateGalleryElement(pageOptions, stepsData, isOvelayOpenHandler, isOverlayOpenNow) {
  const options = {
    gameOptions: pageOptions,
    stepsData,
    birdsListElement: galleryBirdsListElement,
    isOvelayOpenHandler,
    isOverlayOpenNow
  };

  renderGallery(options);
}

export function updateResults(pageOptions) {
  renderResults(pageOptions, resultsMainElement);
}

export function callAllElementsCbs(elementsCbs, pageOptions) {
  elementsCbs.forEach(([cb, ...extraData]) => {
    cb(pageOptions, ...extraData);
  });
}
