import addHtmlClassesToElement from '../../auxiliary/functions';

function renderSteps(gameOptions, stepsData, parentElement) {
  const {
    step: activeStep,
    language
  } = gameOptions;

  const stepsElementChilds = [];

  stepsData.forEach((stepData, i) => {
    const stepElement = document.createElement('span');
    const stepElementHtmlClasses = [
      'btn',
      'game__step',
      i === activeStep ? 'game__step_active' : null
    ];

    addHtmlClassesToElement(stepElement, stepElementHtmlClasses);
    stepElement.textContent = `${stepData.step[language]}`;

    stepsElementChilds.push(stepElement);
  });

  parentElement.replaceChildren(...stepsElementChilds);
}

export default renderSteps;
