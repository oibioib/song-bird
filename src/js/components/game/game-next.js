import addHtmlClassesToElement from '../../auxiliary/functions';
import languageData from '../../data/language';

function renderNext(gameOptions, clickNextHandler, parentElement) {
  const {
    language,
    isNextActive,
    isLastStep
  } = gameOptions;

  const nextElementChilds = [];

  const nextButton = document.createElement('a');
  const nextButtonHtmlClasses = [
    'game__next-btn',
    'btn',
    'btn_big',
    isNextActive ? 'btn_dark' : null,
    isNextActive ? 'btn_active' : null
  ];

  const butttonText = isLastStep
    ? languageData.lastStep[language]
    : languageData.nextButton[language];

  addHtmlClassesToElement(nextButton, nextButtonHtmlClasses);
  nextButton.textContent = butttonText;
  nextButton.setAttribute('href', '/results.html');
  nextButton.addEventListener('click', (e) => {
    if (!isLastStep) e.preventDefault();
    if (!isNextActive) e.preventDefault();
    if (!isLastStep) clickNextHandler();
  });

  nextElementChilds.push(nextButton);

  parentElement.replaceChildren(...nextElementChilds);
}

export default renderNext;
