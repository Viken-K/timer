function setError(primary, secondary = null) {
  // Errors are only in English unfortunately

  document.getElementById('timer-error').innerText = primary;

  if (secondary) {
    document.getElementById('timer-error-secondary').innerText = secondary;
  }
}

function getMessage(language, messageKey) {
  var translations = {
    'en': {
      'timer-progress': 'This timer will expire in',
      'timer-finished': 'This timer has been expired since',
      'months': 'Months',
      'days': 'Days',
      'hours': 'Hours',
      'minutes': 'Minutes',
      'seconds': 'Seconds',
    },
  };

  var messages = translations[language];
  if (!messages) {
    setError('No translations for language: ' + language);
    return null;
  }

  var message = messages[messageKey];
  if (!message) {
    setError('No such message key: ' + messageKey);
    return null;
  }

  return message;
}

var SECONDS_MS = 1000;
var MINUTES_MS = SECONDS_MS * 60;
var HOURS_MS = MINUTES_MS * 60;
var DAYS_MS = HOURS_MS * 24;
var MONTHS_MS = DAYS_MS * 30;

var SECONDS_ENUM = 0;
var MINUTES_ENUM = 1;
var HOURS_ENUM = 2;
var DAYS_ENUM = 3;
var MONTHS_ENUM = 4;

function timeRemaining(endTime) {
  var elapsed = endTime - new Date();
  var finished = true;
  var highest = null;

  if (elapsed < 0) {
    elapsed = -elapsed;
    finished = false;
  }

  var months = Math.floor(elapsed / MONTHS_MS);
  elapsed = Math.floor(elapsed % MONTHS_MS);
  if (months > 0 && highest === null) {
    highest = MONTHS_ENUM;
  }

  var days = Math.floor(elapsed / DAYS_MS);
  elapsed = Math.floor(elapsed % DAYS_MS);
  if (days > 0 && highest === null) {
    highest = DAYS_ENUM;
  }

  var hours = Math.floor(elapsed / HOURS_MS);
  elapsed = Math.floor(elapsed % HOURS_MS);
  if (hours > 0 && highest === null) {
    highest = HOURS_ENUM;
  }

  var minutes = Math.floor(elapsed / MINUTES_MS);
  elapsed = Math.floor(elapsed % MINUTES_MS);
  if (minutes > 0 && highest === null) {
    highest = MINUTES_ENUM;
  }

  var seconds = Math.floor(elapsed / SECONDS_MS);
  elapsed = Math.floor(elapsed % MINUTES_MS);
  if (highest === null) {
    highest = SECONDS_ENUM;
  }

  return {
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    finished: finished,
    highest: highest,
  };
}

function setTimerField(language, field, value) {
  var valueElement = document.getElementById('timer-' + field + '-value');
  var labelElement = document.getElementById('timer-' + field + '-label');

  if (value === null) {
    valueElement.innerText = '';
    labelElement.innerText = '';
  } else {
    valueElement.innerText = value;
    labelElement.innerText = getMessage(language, field);
  }
}

function createTimer(language, timestamp, progressMessage, finishedMessage) {
  var endTime = new Date(timestamp);
  progressMessage = progressMessage || getMessage(language, 'timer-progress');
  finishedMessage = finishedMessage || getMessage(language, 'timer-finished');

  // Update routine, to invoke every second
  var timerFields = [
    ['months', MONTHS_ENUM],
    ['days', DAYS_ENUM],
    ['hours', HOURS_ENUM],
    ['minutes', MINUTES_ENUM],
    ['seconds', SECONDS_ENUM],
  ];

  function updateTimer() {
    var remaining = timeRemaining(endTime);

    // Set title message
    var titleElement = document.getElementById('timer-title');

    if (remaining.finished) {
      titleElement.innerText = getMessage(language, 'timer-finished');
      titleElement.classList = ['finished'];
    } else {
      titleElement.innerText = getMessage(language, 'timer-progress');
      titleElement.classList = ['progress'];
    }

    // Set individual timer fields
    for (var i = 0; i < timerFields.length; i++) {
      var field = timerFields[i][0];
      var enum = timerFields[i][1];

      var value = remaining.highest >= enum
        ? String(remaining[field]).padStart(2, '0')
        : null;

      setTimerField(language, field, value);
    }
  }

  // Configure timer to run regularly.
  updateTimer();
  setInterval(updateTimer, 1000);
}

function setup() {
  // Get parameters
  var parameters = new URLSearchParams(window.location.href);
  var language = parameters.get('lang');
  var timestamp = parameters.get('time');
  var progressMessage = parameters.get('msg1');
  var finishedMessage = parameters.get('msg2');

  // Check parameters
  if (!language) {
    setError('No language set', 'Use "en" for English');
    return;
  }

  if (!timestamp) {
    setError('No timestamp set');
    return;
  }

  try {
    if (/\d+(\.\d+)?/.exec(timestamp)) {
      timestamp = parseFloat(timestamp) / 1000;
    } else {
      timestamp = Date.parse(timestamp);
    }
  } catch (error) {
    setError('Invalid timestamp', error);
  }

  // Initialize clock
  createTimer(language, timestamp, progressMessage, finishedMessage);
}

setup();
