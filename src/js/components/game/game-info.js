import addHtmlClassesToElement from '../../auxiliary/functions';
import languageData from '../../data/language';
import Player from '../audio-player';
import { createErrorLoadingElement, createLoadingElement } from '../ui/ui-loading';

export function renderInfoImage(gameOptions, stepsData, parentElement) {
  const {
    step,
    answerToShowInfo
  } = gameOptions;

  const infoImage = answerToShowInfo ? stepsData[step].data[answerToShowInfo - 1].image : '';
  parentElement.style.backgroundImage = answerToShowInfo ? `url(assets/${infoImage})` : '';
}

export function renderInfoTitle(gameOptions, stepsData, parentElement) {
  const {
    language,
    step,
    answerToShowInfo
  } = gameOptions;

  const infoTitle = document.createElement('div');
  const infoTitleHtmlClasses = [
    'main-title'
  ];

  addHtmlClassesToElement(infoTitle, infoTitleHtmlClasses);

  const title = answerToShowInfo ? stepsData[step].data[answerToShowInfo - 1].name[language] : '';
  const titleLat = answerToShowInfo ? stepsData[step].data[answerToShowInfo - 1].species : '';
  infoTitle.innerHTML = answerToShowInfo ? `${title} <span class="game__info-title-latin">${titleLat}</span>` : '';

  parentElement.replaceChildren(infoTitle);
}

export function renderInfoDescription(gameOptions, stepsData, parentElement) {
  const {
    language,
    step,
    answerToShowInfo
  } = gameOptions;

  const infoDescription = document.createElement('span');

  const description = answerToShowInfo ? stepsData[step].data[answerToShowInfo - 1].description[language] : '';
  infoDescription.textContent = description;

  parentElement.replaceChildren(infoDescription);
}

export function renderInfoOverflow(gameOptions, parentElement) {
  const {
    language,
    answerToShowInfo
  } = gameOptions;

  const infoOverflowHtmlClasses = [
    'game__info-overflow-text'
  ];

  const infoOverflow = document.createElement('div');
  const textOverflow = languageData.infoOverflow[language];
  infoOverflow.textContent = textOverflow;
  addHtmlClassesToElement(infoOverflow, infoOverflowHtmlClasses);

  if (answerToShowInfo) parentElement.classList.add('hidden');
  if (!answerToShowInfo) parentElement.classList.remove('hidden');

  parentElement.replaceChildren(infoOverflow);
}

export async function renderInfoAudio(options) {
  const {
    gameOptions,
    stepsData,
    infoAudioStopCb,
    parentElement
  } = options;

  const {
    step,
    answerToShowInfo
  } = gameOptions;

  if (!answerToShowInfo) return;

  // parentElement.replaceChildren(createLoadingElement());

  const infoAudio = document.createElement('div');
  const infoAudioHtmlClasses = [
    'audio-player'
  ];

  addHtmlClassesToElement(infoAudio, infoAudioHtmlClasses);

  const audioLink = stepsData[step].data[answerToShowInfo - 1].audio;

  const infoPlayer = new Player(audioLink);
  const infoPlayerElement = await infoPlayer.create();

  if (!infoPlayerElement) parentElement.replaceChildren(createErrorLoadingElement());
  if (infoPlayerElement) {
    parentElement.replaceChildren(infoPlayerElement);
    infoAudioStopCb(infoPlayer.end);
  }
}
