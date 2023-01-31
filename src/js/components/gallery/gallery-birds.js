import addHtmlClassesToElement from '../../auxiliary/functions';
import Player from '../audio-player';
import { createErrorLoadingElement } from '../ui/ui-loading';
import renderOverlay from '../ui/ui-overlay';

async function renderBird(options) {
  const {
    elementIndex,
    language,
    birdsData
  } = options;

  const birdElement = document.createElement('div');
  const birdElementHtmlClasses = [
    'game__info',
    'block',
    'block_bg-fill',
    'block_rounded',
    'block_inner-indent'
  ];

  addHtmlClassesToElement(birdElement, birdElementHtmlClasses);

  const birdData = birdsData[elementIndex];

  // title
  const birdTitle = document.createElement('div');
  birdTitle.classList.add('game__info-title');
  const title = birdData.name[language];
  const titleLat = birdData.species;
  birdTitle.innerHTML = `${title} <span class="game__info-title-latin">${titleLat}</span>`;

  // image
  const birdImage = document.createElement('div');
  birdImage.classList.add('game__info-img');
  const { image } = birdData;
  birdImage.style.backgroundImage = `url(assets/${image})`;

  // description
  const birdDescription = document.createElement('div');
  birdDescription.classList.add('game__info-description');
  const description = birdData.description[language];
  birdDescription.textContent = description;

  // audio
  const birdAudio = document.createElement('div');
  birdAudio.classList.add('game__info-audio');
  const audioLink = birdData.audio;
  const audioPlayer = new Player(audioLink);
  const audioPlayerElement = await audioPlayer.create();

  if (!audioPlayerElement) birdAudio.append(createErrorLoadingElement());
  if (audioPlayerElement) birdAudio.replaceChildren(audioPlayerElement);

  const birdElementChilds = [
    birdTitle,
    birdDescription,
    birdImage,
    birdAudio
  ];

  birdElement.append(...birdElementChilds);

  const returnResult = {
    element: birdElement,
    endHandler: audioPlayerElement ? audioPlayer.end : undefined
  };

  return returnResult;
}

function renderGallery(options) {
  const {
    gameOptions,
    stepsData,
    birdsListElement,
    isOvelayOpenHandler,
    isOverlayOpenNow
  } = options;

  const {
    language
  } = gameOptions;

  const birdsData = [];

  stepsData.forEach((step) => {
    const birds = step.data;
    birds.forEach((bird) => {
      birdsData.push(bird);
    });
  });

  const birdsElements = [];

  birdsData.forEach((birdData, index) => {
    const birdElement = document.createElement('div');
    birdElement.classList.add('gallery__list-info');
    birdElement.setAttribute('data-bird', index);

    const birdTitle = document.createElement('div');
    birdTitle.classList.add('gallery__list-info-title');
    const title = birdData.name[language];
    birdTitle.textContent = title;

    const birdImage = document.createElement('div');
    birdImage.classList.add('gallery__list-info-img');
    const { image } = birdData;
    birdImage.style.backgroundImage = `url(assets/${image})`;

    birdElement.append(birdImage, birdTitle);

    const birdElementClickHandler = async () => {
      const renderOptions = {
        elementIndex: index,
        language,
        birdsData,
        isOvelayOpenHandler
      };

      if (!isOverlayOpenNow()) {
        isOvelayOpenHandler(true);
        const {
          element,
          endHandler
        } = await renderBird(renderOptions);

        if (endHandler) {
          const closeOverlayHandler = () => {
            endHandler();
            isOvelayOpenHandler(false);
          };
          renderOverlay(element, closeOverlayHandler);
        } else {
          renderOverlay(element);
        }
      }
    };

    birdElement.addEventListener('click', birdElementClickHandler);
    birdsElements.push(birdElement);
  });

  birdsListElement.replaceChildren(...birdsElements);
}

export default renderGallery;
