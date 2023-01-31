import addHtmlClassesToElement from '../../auxiliary/functions';
import languageData from '../../data/language';

function renderIndexPageElement(gameOptions, parentElement) {
  const {
    language
  } = gameOptions;

  const indexPageElement = document.createElement('div');

  const indexPageElementHtmlClasses = [
    'index-page__block',
    'block',
    'block_bg-fill',
    'block_rounded',
    'block_inner-indent'
  ];

  addHtmlClassesToElement(indexPageElement, indexPageElementHtmlClasses);

  const indexPageElementChilds = [];

  const buttonsLinkHtmlClasses = [
    'btn',
    'btn_active',
    'btn_dark',
    'btn_extra-big'
  ];

  const buttons = [
    {
      game: {
        link: 'game.html',
        tag: 'a',
        htmlClasses: buttonsLinkHtmlClasses
      }
    },
    {
      gallery: {
        link: 'gallery.html',
        tag: 'a',
        htmlClasses: buttonsLinkHtmlClasses
      }
    }
  ];

  buttons.forEach((button) => {
    const [
      page,
      pageData
    ] = Object.entries(button).pop();

    const {
      link,
      tag,
      htmlClasses
    } = pageData;

    const buttonElement = document.createElement(tag);
    const buttonText = languageData.menu[page][language];
    buttonElement.textContent = buttonText;

    buttonElement.setAttribute('href', link);
    addHtmlClassesToElement(buttonElement, htmlClasses);
    indexPageElementChilds.push(buttonElement);
  });

  parentElement.replaceChildren(...indexPageElementChilds);
}

export default renderIndexPageElement;
