"use strict";

(function iife() {
  const timerEl = document.querySelector('.timer');

  const setTimer = (endAt) => {
    const totalSeconds  = Math.max( 0, endAt - Math.floor(Date.now()/1000) );
    const secondsLeft = totalSeconds % 60;
    const minsLeft = (totalSeconds - secondsLeft)/60;
    timerEl.innerText = `${minsLeft}:${secondsLeft.toString().padStart(2,'0')}`;
  };

  const updateTimer = () => {
    // No error checking shown, but should be present on real code
    return fetch('/api/controls', {
      method: 'GET',
    })
    .then( response => response.json() )
    .then( controls => setTimer(controls.timer.endAt) )
    .then( setTimeout( updateTimer, 1000) );
  };

  updateTimer();

})();

