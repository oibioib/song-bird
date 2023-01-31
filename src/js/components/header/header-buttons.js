import addHtmlClassesToElement from '../../auxiliary/functions';
import languageData from '../../data/language';

function renderButtons(options) {
  const {
    pageOptions,
    parentElement,
    changeLanguageHandler,
    changeThemeHandler
  } = options;

  const {
    page,
    language,
    isDarkTheme
  } = pageOptions;

  const themeState = isDarkTheme ? 'mode_night' : 'light_mode';
  const themeButton = `<span class="ui-icons">${themeState}</span>`;

  const buttonsElementChilds = [];

  const buttonsLinkHtmlClasses = [
    'btn',
    'btn_active',
    'btn_transparent',
    'header__button'
  ];

  const buttons = [
    {
      index: {
        link: 'index.html',
        tag: 'a',
        textContent: '<span class="ui-icons">home</span>',
        event: null,
        listener: null,
        htmlClasses: buttonsLinkHtmlClasses
      }
    },
    {
      game: {
        link: 'game.html',
        tag: 'a',
        textContent: '<span class="ui-icons">sports_esports</span>',
        event: null,
        listener: null,
        htmlClasses: buttonsLinkHtmlClasses
      }
    },
    // {
    //   results: {
    //     link: 'results.html',
    //     tag: 'a',
    //     textContent: '<span class="ui-icons">leaderboard</span>',
    //     event: null,
    //     listener: null,
    //     htmlClasses: buttonsLinkHtmlClasses
    //   }
    // },
    {
      gallery: {
        link: 'gallery.html',
        tag: 'a',
        textContent: '<span class="ui-icons">collections</span>',
        event: null,
        listener: null,
        htmlClasses: buttonsLinkHtmlClasses
      }
    },
    {
      language: {
        link: null,
        tag: 'span',
        textContent: languageData.menu.language[language],
        event: 'click',
        listener: changeLanguageHandler,
        htmlClasses: [
          'btn',
          'btn_active',
          'btn_dark',
          'header__button'
        ]
      }
    },
    {
      theme: {
        link: null,
        tag: 'span',
        textContent: themeButton,
        event: 'click',
        listener: changeThemeHandler,
        htmlClasses: [
          'btn',
          'btn_active',
          'btn_dark',
          'header__button'
        ]
      }
    }
  ];

  buttons.forEach((button) => {
    const {
      link,
      tag,
      textContent,
      htmlClasses,
      event,
      listener
    } = Object.values(button).pop();

    const buttonPage = Object.keys(button).pop();

    const buttonElement = document.createElement(tag);
    buttonElement.innerHTML = textContent;

    if (link) buttonElement.setAttribute('href', link);
    if (htmlClasses) addHtmlClassesToElement(buttonElement, htmlClasses);
    if (buttonPage === page) buttonElement.classList.add('btn_current');
    if (event && listener) buttonElement.addEventListener(event, listener);

    buttonsElementChilds.push(buttonElement);
  });

  parentElement.replaceChildren(...buttonsElementChilds);
}

export default renderButtons;
