const prefix = 'oibioib_';

export const getLang = () => localStorage.getItem(`${prefix}language`);
export const setLang = (lang) => localStorage.setItem(`${prefix}language`, lang.toLowerCase());

export const getTheme = () => JSON.parse(localStorage.getItem(`${prefix}isdarktheme`));
export const setTheme = (isDarkTheme) => {
  const data = JSON.stringify(isDarkTheme);
  localStorage.setItem(`${prefix}isdarktheme`, data);
};

export const setScore = (score) => localStorage.setItem(`${prefix}score`, score);
export const getScore = () => localStorage.getItem(`${prefix}score`);
export const clearScore = () => localStorage.removeItem(`${prefix}score`);

export const setResultAudioPlayed = () => localStorage.setItem(`${prefix}result-audio-payed`, JSON.stringify(true));
export const getResultAudioPlayed = () => JSON.parse(localStorage.getItem(`${prefix}result-audio-payed`));
export const clearResultAudioPlayed = () => localStorage.removeItem(`${prefix}result-audio-payed`);
