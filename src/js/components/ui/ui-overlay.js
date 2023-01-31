const renderOverlay = (element, cb) => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const overlayInner = document.createElement('div');
  overlayInner.classList.add('overlay__inner');
  overlayInner.append(element);

  overlay.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('overlay')
      || event.target.classList.contains('overlay__close')
    ) {
      document.body.classList.remove('overlay');
      overlay.remove();
      if (cb) cb();
    }
  });

  const overlayClose = document.createElement('div');
  overlayClose.classList.add('close', 'overlay__close');

  overlay.append(overlayInner, overlayClose);
  document.body.append(overlay);
  document.body.classList.add('overlay');
};

export default renderOverlay;
