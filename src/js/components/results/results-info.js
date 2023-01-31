import addHtmlClassesToElement, { loadAudio } from '../../auxiliary/functions';
import audioControls from '../../data/audio';
import languageData from '../../data/language';
import { getResultAudioPlayed, getScore, setResultAudioPlayed } from '../../services/localstorage';

async function renderResults(pageOptions, resultsMainElement) {
  const {
    language
  } = pageOptions;

  const resultInfoElement = document.createElement('div');
  const resultInfoElementHtmlClasses = [
    'block',
    'block_rounded',
    'block_inner-indent',
    'block_bg-fill',
    'results__inner'
  ];

  addHtmlClassesToElement(resultInfoElement, resultInfoElementHtmlClasses);

  const resultInfoElementChilds = [];

  const buttonPlayElement = document.createElement('a');
  const buttonPlayElementHtmlClasses = [
    'btn',
    'btn_active',
    'btn_dark',
    'btn_big',
    'results__button'
  ];

  addHtmlClassesToElement(buttonPlayElement, buttonPlayElementHtmlClasses);
  buttonPlayElement.textContent = languageData.menu.game[language];
  buttonPlayElement.setAttribute('href', 'game.html');

  const gameScore = getScore();
  const isResultAudioPlayed = getResultAudioPlayed();

  if (gameScore !== null) {
    const resultScoreElement = document.createElement('p');
    resultScoreElement.classList.add('results__score');
    const scoreMessage = languageData.resultScore[language].replace('%%', gameScore);
    resultScoreElement.textContent = scoreMessage;
    resultInfoElementChilds.push(resultScoreElement);

    const resultMessageElement = document.createElement('p');
    resultMessageElement.classList.add('results__message');
    const messageTryMore = languageData.resultTryMore[language];
    const messageCongratulation = languageData.resultCongratulation[language];
    const message = gameScore !== '30' ? messageTryMore : messageCongratulation;
    resultMessageElement.textContent = message;
    resultInfoElementChilds.push(resultMessageElement);
    if (!isResultAudioPlayed) {
      const audio = await loadAudio(audioControls.congratulation);
      audio.play();
      setResultAudioPlayed();
    }
  }

  resultInfoElementChilds.push(buttonPlayElement);
  resultInfoElement.append(...resultInfoElementChilds);
  resultsMainElement.replaceChildren(resultInfoElement);
}

export default renderResults;
