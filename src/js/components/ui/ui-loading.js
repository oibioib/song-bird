export function createLoadingElement() {
  const loadingDivElement = document.createElement('div');
  loadingDivElement.classList.add('loading');
  return loadingDivElement;
}

export function createErrorLoadingElement() {
  const errorLoadingElemenet = document.createElement('span');
  errorLoadingElemenet.classList.add('ui-icons', 'error');
  errorLoadingElemenet.textContent = 'warning_amber';
  return errorLoadingElemenet;
}
