import addHtmlClassesToElement from '../../auxiliary/functions';
import Player from '../audio-player';
import { createErrorLoadingElement, createLoadingElement } from '../ui/ui-loading';

export function renderQuestionImage(gameOptions, stepsData, parentElement) {
  const {
    step,
    stepRightAnswer,
    lastAnswer
  } = gameOptions;

  parentElement.style.backgroundImage = '';

  if (stepRightAnswer === lastAnswer) {
    const { image } = stepsData[step].data[stepRightAnswer - 1];
    parentElement.style.backgroundImage = `url(assets/${image})`;
  }
}

export function renderQuestionTitle(gameOptions, stepsData, parentElement) {
  const {
    language,
    step,
    stepRightAnswer,
    lastAnswer
  } = gameOptions;

  const questionTitle = document.createElement('span');
  const questionTitleHtmlClasses = [
    'main-title'
  ];

  addHtmlClassesToElement(questionTitle, questionTitleHtmlClasses);

  const title = stepRightAnswer === lastAnswer
    ? stepsData[step].data[stepRightAnswer - 1].name[language]
    : '********';

  questionTitle.textContent = title;

  parentElement.replaceChildren(questionTitle);
}

export async function renderQuestionAudio(options) {
  const {
    gameOptions,
    stepsData,
    getCurrentStep,
    questionAudioStopCb,
    questionAudioPauseCb,
    parentElement
  } = options;
  const {
    step,
    stepRightAnswer
  } = gameOptions;

  // parentElement.replaceChildren(createLoadingElement());

  const questionAudio = document.createElement('div');
  const questionAudioHtmlClasses = [
    'audio-player'
  ];

  addHtmlClassesToElement(questionAudio, questionAudioHtmlClasses);

  const audioLink = stepsData[step].data[stepRightAnswer - 1].audio;

  const questionPlayer = new Player(audioLink);
  const audioElement = await questionPlayer.create();

  if (!audioElement) parentElement.replaceChildren(createErrorLoadingElement());
  if (audioElement && step === getCurrentStep()) {
    parentElement.replaceChildren(audioElement);
    questionAudioStopCb(questionPlayer.end);
    questionAudioPauseCb(questionPlayer.pause)
  }
}
