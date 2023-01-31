import addHtmlClassesToElement from '../../auxiliary/functions';
import languageData from '../../data/language';

function renderScore(gameOptions, parentElement) {
  const {
    language,
    score
  } = gameOptions;

  const scoreElementChilds = [];

  const scoreTextElement = document.createElement('span');
  const scoreTextElementHtmlClasses = [
    'header__score-info',
    'font-bold'
  ];

  addHtmlClassesToElement(scoreTextElement, scoreTextElementHtmlClasses);
  scoreTextElement.textContent = `${languageData.score[language]}:`;

  const scoreNumberElement = document.createElement('span');
  const scoreNumberElementHtmlClasses = [
    'header__score-info',
    'header__score-info_indent',
    'header__score-info_color',
    'font-bold'
  ];

  addHtmlClassesToElement(scoreNumberElement, scoreNumberElementHtmlClasses);
  scoreNumberElement.textContent = score;

  scoreElementChilds.push(scoreTextElement, scoreNumberElement);

  parentElement.replaceChildren(...scoreElementChilds);
}

export default renderScore;
