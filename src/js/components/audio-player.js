function Player(audioSrc) {
  this.audioSrc = audioSrc;
  this.audioLoaded = undefined;
  this.volume = 0.7;
  this.isPause = true;
  this.playPauseElement = null;
  this.volumeMuteElement = null;
  this.timeLineElement = null;
  this.playerElement = null;
  this.timeStampElement = null;
  this.volumeElement = null;

  this.audioEnd = false;

  const DEFAULT_VOLUME = 0.7;
  const RANGE_RATIO = 1000;

  const playIco = 'play_circle_outline';
  const pauseIco = 'pause_circle_outline';
  const iconsHtmlClasses = ['ui-icons', 'audio-player__btn', 'audio-player__btn_play'];

  const volumeUp = 'volume_up';
  const volumeOff = 'volume_off';
  const volumeHtmlClasses = ['ui-icons', 'audio-player__btn'];

  const convertTime = (num) => {
    let seconds = parseInt(num, 10);
    let minutes = parseInt(seconds / 60, 10);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60, 10);
    minutes -= hours * 60;
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  };

  const loadAudio = () => new Promise((resolve) => {
    const audio = new Audio(this.audioSrc);
    audio.addEventListener('canplaythrough', () => resolve(audio));
    audio.addEventListener('error', () => resolve(null));
  });

  const updateTimeLine = () => {
    const { currentTime, duration } = this.audioLoaded;
    const value = (currentTime / duration) * RANGE_RATIO;
    this.timeLineElement.value = value;
    this.timeLineElement.style.setProperty('--value', value);
  };

  const updateTimeStamp = () => {
    const { currentTime, duration } = this.audioLoaded;
    const time = `${convertTime(currentTime)} / ${convertTime(duration)}`;
    this.timeStampElement.textContent = time;
  };

  const updateVolume = () => {
    const { volume } = this.audioLoaded;
    this.volumeElement.value = volume * RANGE_RATIO;
    this.volumeElement.style.setProperty('--value', volume * RANGE_RATIO);
    this.volumeMuteElement.textContent = volume ? volumeUp : volumeOff;
  };

  const updateAudioElementsByTime = () => {
    if (this.audioEnd) return;
    updateTimeLine();
    updateTimeStamp();
    updateVolume();
    setTimeout(updateAudioElementsByTime, 500);
  };

  const setPropsToInputsRange = (element) => {
    element.style.setProperty('--value', element.value);
    element.style.setProperty('--min', element.min === '' ? '0' : element.min);
    element.style.setProperty('--max', element.max === '' ? '100' : element.max);
  };

  this.play = () => {
    this.isPause = false;
    this.audioLoaded.play();
    this.playPauseElement.textContent = pauseIco;
  };

  this.pause = () => {
    this.isPause = true;
    this.audioLoaded.pause();
    this.playPauseElement.textContent = playIco;
  };

  this.togglePlayPause = () => {
    if (this.isPause) {
      this.play();
      return;
    }
    this.pause();
  };

  this.volumeUp = () => {
    const volumeToSet = this.volume ? this.volume : DEFAULT_VOLUME;
    this.audioLoaded.volume = volumeToSet;
    this.volume = volumeToSet;
    this.volumeMuteElement.textContent = volumeUp;
  };

  this.volumeOff = () => {
    this.audioLoaded.volume = 0;
    this.volumeMuteElement.textContent = volumeOff;
  };

  this.toggleVolume = () => {
    if (!this.audioLoaded.volume) {
      this.volumeUp();
      return;
    }
    this.volumeOff();
  };

  this.end = () => {
    this.pause();
    this.audioEnd = true;
  };

  this.create = async () => {
    try {
      const audio = await loadAudio();
      if (audio) {
        audio.volume = this.volume;
        this.audioLoaded = audio;

        const playerElement = document.createElement('div');
        playerElement.classList.add('audio-player');
        this.playerElement = playerElement;

        const playPauseButton = document.createElement('span');
        playPauseButton.textContent = playIco;
        playPauseButton.classList.add(...iconsHtmlClasses);
        playPauseButton.classList.add('audio-player__play-button');
        playPauseButton.addEventListener('click', this.togglePlayPause);
        this.playPauseElement = playPauseButton;

        const timeLine = document.createElement('input');
        timeLine.type = 'range';
        timeLine.min = 0;
        timeLine.max = RANGE_RATIO;
        timeLine.value = 0;
        timeLine.classList.add('audio-player__timeline', 'input-range', 'progress-color');
        setPropsToInputsRange(timeLine);
        this.timeLineElement = timeLine;

        const timeStamp = document.createElement('div');
        const time = `${convertTime(audio.currentTime)} / ${convertTime(audio.duration)}`;
        timeStamp.textContent = time;
        timeStamp.classList.add('audio-player__timestamp');
        this.timeStampElement = timeStamp;

        const volumeButtons = document.createElement('div');
        volumeButtons.classList.add('audio-player__volume');

        const volumeMuteButton = document.createElement('span');
        volumeMuteButton.textContent = volumeUp;
        volumeMuteButton.classList.add(...volumeHtmlClasses);
        volumeMuteButton.classList.add('audio-player__volume-mute');
        this.volumeMuteElement = volumeMuteButton;

        const volumeSelect = document.createElement('input');
        volumeSelect.type = 'range';
        volumeSelect.min = 0;
        volumeSelect.max = RANGE_RATIO;
        volumeSelect.value = this.volume * RANGE_RATIO;
        volumeSelect.classList.add('audio-player__volume-range', 'input-range', 'progress-color');
        setPropsToInputsRange(volumeSelect);
        this.volumeElement = volumeSelect;

        volumeButtons.append(volumeMuteButton, volumeSelect);

        const timeLineHandler = (e) => {
          const { duration } = this.audioLoaded;
          this.audioLoaded.currentTime = (e.target.value / RANGE_RATIO) * duration;
          e.target.style.setProperty('--value', e.target.value);
          if (!this.isPause) this.play();
        };

        const volumeSelectHandler = (e) => {
          const volumeSelected = e.target.value / RANGE_RATIO;
          this.volume = volumeSelected;
          this.audioLoaded.volume = volumeSelected;
          e.target.style.setProperty('--value', e.target.value);
        };

        const audioEndedHandler = () => {
          this.audioLoaded.currentTime = 0;
          this.isPause = true;
          this.playPauseElement.textContent = playIco;
        };

        playPauseButton.addEventListener('click', this.togglePlayPause);
        volumeMuteButton.addEventListener('click', this.toggleVolume);
        timeLine.addEventListener('input', timeLineHandler);
        volumeSelect.addEventListener('input', volumeSelectHandler);
        audio.addEventListener('ended', audioEndedHandler);

        const playerElements = [
          playPauseButton,
          timeLine,
          timeStamp,
          volumeButtons
        ];

        this.playerElement.append(...playerElements);

        updateAudioElementsByTime();
      } else {
        throw new Error(`Error loading audio file ${audioSrc}`);
      }
    } catch (error) {
      console.log(error.message);
    }
    return this.playerElement;
  };
}
export default Player;
