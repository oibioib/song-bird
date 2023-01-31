import addHtmlClassesToElement from '../../auxiliary/functions';

function renderLogo(gameOptions, parentElement) {
  const {
    page
  } = gameOptions;

  const logoElementChilds = [];

  const logoImage = document.createElement('img');
  const logoImageHtmlClasses = [
    'header__logo-image'
  ];
  const logoImageAttributes = {
    src: 'assets/bird-logo.png',
    alt: 'Songbird'
  };

  addHtmlClassesToElement(logoImage, logoImageHtmlClasses);

  Object.entries(logoImageAttributes).forEach(([attribute, value]) => {
    logoImage.setAttribute(attribute, value);
  });

  if (page === 'index') {
    logoElementChilds.push(logoImage);
  } else {
    const logoLink = document.createElement('a');
    logoLink.setAttribute('href', '/');
    logoLink.append(logoImage);
    logoElementChilds.push(logoLink);
  }

  parentElement.replaceChildren(...logoElementChilds);
}

export default renderLogo;
