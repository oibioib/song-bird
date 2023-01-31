console.message = (message, color = 'black', weight = 'normal') => {
  console.log(`%c ${message}`, `color: ${color}; font-weight: ${weight}`);
};

const selfTest = () => {
  console.message('Хорошего дня!', 'orange', 'bold');
  console.message('Все требования задания выполнены. 270/270', 'orange', 'normal');
  console.message('Результат самопроверки в формате markdown - https://oibioib-songbird-rs-school-2022q3.netlify.app/self-test.md', 'dodgerblue', 'normal');
  console.message('Ссылка на задание - https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird/songbird-2022q3.md', 'chocolate', 'normal');
};

export default selfTest;
