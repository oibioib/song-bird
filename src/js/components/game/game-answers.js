import addHtmlClassesToElement, { getRandomNum } from '../../auxiliary/functions';

export function calcRandomNumberForStep(gameOptions, stepsData, cb) {
  const {
    step
  } = gameOptions;

  const answersInStep = stepsData[step].data.length;
  const randomAnswer = getRandomNum(1, answersInStep);
  cb(randomAnswer);
}

function renderAnswers(options) {
  const {
    gameOptions,
    stepsData,
    selectAnswerHandler,
    showInfoHandler,
    parentElement
  } = options;

  const {
    language,
    step,
    lastAnswer,
    wrongAnswers
  } = gameOptions;

  const answersElementChilds = [];

  const answers = stepsData[step].data;

  answers.forEach((answer) => {
    const {
      id,
      name
    } = answer;

    const answerElement = document.createElement('div');
    const answerElementtHtmlClasses = [
      'btn',
      'btn_active',
      'btn_transparent',
      'game__answers-btn',
      wrongAnswers.includes(id) ? 'game__answers-btn_wrong' : null,
      id === lastAnswer ? 'game__answers-btn_right' : null
    ];

    addHtmlClassesToElement(answerElement, answerElementtHtmlClasses);
    answerElement.textContent = `${name[language]}`;

    answerElement.addEventListener('click', () => {
      selectAnswerHandler(id);
      showInfoHandler(id);
    });
    answersElementChilds.push(answerElement);
  });

  parentElement.replaceChildren(...answersElementChilds);
}

export default renderAnswers;
