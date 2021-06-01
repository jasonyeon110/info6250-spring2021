"use strict";

( function iife() {

  const setTimerButton = document.querySelector('.set-timer');
  setTimerButton.addEventListener('click', () => {
    const setTo = document.querySelector('.timer').value;
    setTimerButton.disabled = true;
    fetch('/api/controls/timer', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({timer: setTo}),
    })
    .finally( () => {
      setTimerButton.disabled = false;
    });
  });

})();
