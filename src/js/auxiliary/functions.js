function addHtmlClassesToElement(element, elementHtmlClasses) {
  elementHtmlClasses
    .filter(Boolean)
    .forEach((htmlClass) => {
      element.classList.add(htmlClass);
    });
}

export const getRandomNum = (fromInclude, toInclude) => {
  const min = Math.ceil(fromInclude);
  const max = Math.floor(toInclude);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function loadAudio(audioSrc) {
  return new Promise((resolve) => {
    const audio = new Audio(audioSrc);
    audio.addEventListener('canplaythrough', () => resolve(audio));
    audio.addEventListener('error', () => resolve(null));
  });
}

export function loadImage(iamge) {
  return new Promise((resolve) => {
    iamge.addEventListener('load', () => resolve(iamge));
    iamge.addEventListener('error', () => resolve(null));
  });
}

export default addHtmlClassesToElement;
