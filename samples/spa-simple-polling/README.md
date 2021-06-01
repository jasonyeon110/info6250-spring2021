# Simple polling example

This is code I use to show the "Class Resumes in..." countdown timer in class.  
As such, I've skipped many steps because it is small and only for my use.

- `/public/controls/index.html` is a page I can use to set the timer
- `/public/timer/index.html` is the output

The polling is in `public/timer/timer.js`, the function updateTimer();

This function makes the service call, updates the DOM, and then sets a timeout (a call to a callback that occurs after a given amount of time)

See https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout for more details

A few notes:
- I am polling so I know what time to use: otherwise, changing it on the server won't change it on the display
- I use `setTimeout` instead of `setInterval` because:
  - The time you pass to either is NOT the time that will pass before the call, but instead the _minimum_ time.  If some code is running it can be delayed.  For something like a countdown, the differences can add up and can cause problems
  - setInterval is kind of annoying because you have to cancel the interval, as opposed to just not calling the next setTimeout
- I'm not saving the timeoutID to cancel it because this is a super tiny program - real code may want to behave differently

