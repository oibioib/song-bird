import '../css/main.scss';
import gameConfig from './config/config';
import birdsData from './data/birds-data';
import { languageChangeFromTo } from './data/language';
import {
  callAllElementsCbs,
  updateLogo,
  updateMenu,
  updateNext,
  updateScore,
  updateSteps,
  updateTheme,
  updateAnswers,
  updateQuestionImage,
  updateQuestionTitle,
  updateInfoImage,
  updateInfoTitle,
  updateInfoDescription,
  updateInfoOverflow,
  updateQuestionAudio,
  updateInfoAudio
} from './components/update-components';
import { calcRandomNumberForStep } from './components/game/game-answers';
import { loadAudio } from './auxiliary/functions';
import audioControls from './data/audio';
import {
  getLang,
  getTheme,
  setLang,
  setScore,
  setTheme
} from './services/localstorage';
import selfTest from './self-test';

const pageOptions = {
  page: 'game',
  language: 'ru',
  isDarkTheme: true,
  score: 0,
  step: 0,
  isStepEnd: false,
  isLastStep: false,
  stepRightAnswer: null,
  lastAnswer: null,
  answerToShowInfo: null,
  wrongAnswers: [],
  isNextActive: false,
  questionAudioStopCb: null,
  infoAudioStopCb: null,
  questionAudioPauseCb: null
};

function updateStateCb(prop, data) {
  pageOptions[prop] = data;
}

const elementsHandlers = {
  theme: [updateTheme],
  logo: [updateLogo],
  menu: [updateMenu, changeLanguageHandler, changeThemeHandler],
  score: [updateScore],
  steps: [updateSteps, birdsData],
  next: [updateNext, clickNextHandler],
  answers: [updateAnswers, birdsData, selectAnswerHandler, showInfoHandler],
  questionImage: [updateQuestionImage, birdsData],
  questionTitle: [updateQuestionTitle, birdsData],
  questionAudio: [
    updateQuestionAudio,
    birdsData,
    () => pageOptions.step,
    (data) => updateStateCb('questionAudioStopCb', data),
    (data) => updateStateCb('questionAudioPauseCb', data)

  ],
  infoImage: [updateInfoImage, birdsData],
  infoTitle: [updateInfoTitle, birdsData],
  infoDescription: [updateInfoDescription, birdsData],
  infoAudio: [
    updateInfoAudio,
    birdsData,
    (data) => {
      updateStateCb('infoAudioStopCb', data);
    }
  ],
  infoOverflow: [updateInfoOverflow],
  randomStepAnswer: [
    calcRandomNumberForStep,
    birdsData,
    (data) => updateStateCb('stepRightAnswer', data)
  ]
};

async function selectAnswerHandler(n) {
  const selectAnswerElementsCbs = [
    elementsHandlers.answers,
    elementsHandlers.next,
    elementsHandlers.score,
    elementsHandlers.questionImage,
    elementsHandlers.questionTitle
  ];

  if (!pageOptions.isStepEnd) {
    if (n !== pageOptions.stepRightAnswer) {
      if (!pageOptions.wrongAnswers.includes(n)) {
        pageOptions.wrongAnswers.push(n);
        const audio = await loadAudio(audioControls.error);
        audio.play();
      }
    } else {
      pageOptions.lastAnswer = n;
      pageOptions.isStepEnd = true;
      pageOptions.isNextActive = true;
      pageOptions.score += gameConfig.MAX_SCORE - pageOptions.wrongAnswers.length;
      const audio = await loadAudio(audioControls.ok);
      audio.play();
      pageOptions.questionAudioPauseCb();
    }
    callAllElementsCbs(selectAnswerElementsCbs, pageOptions);
  }
}

function showInfoHandler(n) {
  const showInfoElementsCbs = [
    elementsHandlers.infoTitle,
    elementsHandlers.infoImage,
    elementsHandlers.infoDescription,
    elementsHandlers.infoAudio,
    elementsHandlers.infoOverflow
  ];

  pageOptions.answerToShowInfo = n;
  callAllElementsCbs(showInfoElementsCbs, pageOptions);

  if (pageOptions.infoAudioStopCb) pageOptions.infoAudioStopCb();
}

function clickNextHandler() {
  const clickNextElementsCbs = [
    elementsHandlers.answers,
    elementsHandlers.next,
    elementsHandlers.score,
    elementsHandlers.steps,
    elementsHandlers.questionImage,
    elementsHandlers.questionTitle,
    elementsHandlers.infoTitle,
    elementsHandlers.infoImage,
    elementsHandlers.infoDescription,
    elementsHandlers.infoOverflow,
    elementsHandlers.questionAudio
  ];

  if (pageOptions.isStepEnd) {
    if (pageOptions.questionAudioStopCb) pageOptions.questionAudioStopCb();
    if (pageOptions.infoAudioStopCb) pageOptions.infoAudioStopCb();
    pageOptions.step += 1;
    pageOptions.isStepEnd = false;
    pageOptions.stepRightAnswer = null;
    pageOptions.lastAnswer = null;
    pageOptions.wrongAnswers.length = 0;
    pageOptions.answerToShowInfo = null;
    pageOptions.isNextActive = false;
    pageOptions.questionAudioStopCb = null;
    pageOptions.questionAudioPauseCb = null;
    pageOptions.infoAudioStopCb = null;
    if (pageOptions.step === gameConfig.MAX_STEPS) pageOptions.isLastStep = true;
    callAllElementsCbs([elementsHandlers.randomStepAnswer], pageOptions);
  }

  callAllElementsCbs(clickNextElementsCbs, pageOptions);
}

function changeLanguageHandler() {
  const updateElementsCbs = [
    elementsHandlers.theme,
    elementsHandlers.menu,
    elementsHandlers.score,
    elementsHandlers.steps,
    elementsHandlers.next,
    elementsHandlers.answers,
    elementsHandlers.questionTitle,
    elementsHandlers.infoTitle,
    elementsHandlers.infoImage,
    elementsHandlers.infoDescription,
    elementsHandlers.infoOverflow
  ];

  pageOptions.language = languageChangeFromTo[pageOptions.language];

  callAllElementsCbs(updateElementsCbs, pageOptions);
}

function changeThemeHandler() {
  const updateElementsCbs = [
    elementsHandlers.theme,
    elementsHandlers.menu
  ];

  pageOptions.isDarkTheme = !pageOptions.isDarkTheme;

  callAllElementsCbs(updateElementsCbs, pageOptions);
}

function createPageElements() {
  const createElementsCbs = [
    elementsHandlers.randomStepAnswer,
    elementsHandlers.theme,
    elementsHandlers.logo,
    elementsHandlers.menu,
    elementsHandlers.score,
    elementsHandlers.steps,
    elementsHandlers.next,
    elementsHandlers.answers,
    elementsHandlers.questionTitle,
    elementsHandlers.questionAudio,
    elementsHandlers.infoOverflow
  ];

  callAllElementsCbs(createElementsCbs, pageOptions);
}

function beforeUnloadHandler() {
  const {
    language,
    isDarkTheme,
    score,
    isLastStep,
    isStepEnd
  } = pageOptions;

  setLang(language);
  setTheme(isDarkTheme);

  if (isLastStep && isStepEnd) {
    setScore(score);
  }
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
