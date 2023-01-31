import { loadImage } from '../../auxiliary/functions';

async function updateIndexBackground(imageNum, parentElement) {
  const url = window.location.origin;
  const imageTemplate = '/assets/bird';
  const imageTemplateExtension = '.jpg';
  const imageSrc = `${url}${imageTemplate}${imageNum}${imageTemplateExtension}`;
  const image = new Image();
  image.src = imageSrc;
  const imageLoadResult = await loadImage(image);
  if (!imageLoadResult) return;

  parentElement.style.backgroundImage = `url(${image.src})`;
  parentElement.style.backgroundSize = 'cover';
  parentElement.style.backgroundPosition = 'center center';
}

export default updateIndexBackground;
