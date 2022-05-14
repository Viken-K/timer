// Constants
var SECONDS_MS = 1000;
var MINUTES_MS = SECONDS_MS * 60;
var HOURS_MS = MINUTES_MS * 60;
var DAYS_MS = HOURS_MS * 24;

// Initialization errors are only in English unfortunately.
function setError(primary, secondary = null) {
  var errorElement = document.getElementById('error');
  errorElement.classList.remove('hidden');
  errorElement.innerText = primary;

  var formElement = document.getElementById('form');
  formElement.classList.add('hidden');

  if (secondary) {
    var secondaryErrorElement = document.createElement('div');
    secondaryErrorElement.classList = ['error-secondary'];
    secondaryErrorElement.innerText = secondary;
    errorElement.appendChild(secondaryErrorElement);
  }
}

// Localization
function getMessage(language, messageKey) {
  var translations = {
    // English
    'en': {
      'timer-description': 'Timer expiring at',
      'timer-progress': 'This timer will expire in',
      'timer-finished': 'This timer has been expired since',
      'timer-type': 'Timer Type',
      'timer-type-generic': 'Generic',
      'timer-type-deletion': 'Deletion',
      'timer-type-ban': 'Ban',
      'duration': 'Duration',
      'duration-1d': '1 Day',
      'duration-1w': '1 Week',
      'duration-2w': '2 Weeks',
      'duration-1y': '1 Year',
      'duration-custom': 'Custom',
      'unit-minute': 'minutes',
      'unit-hour': 'hours',
      'unit-day': 'days',
      'unit-week': 'weeks',
      'unit-month': 'months',
      'unit-year': 'years',
      'start-time': 'Start Time',
      'start-time-now': 'Now',
      'start-time-later': 'Later',
      'messages': 'Messages',
      'message-progress': 'Timer in-progress (optional)',
      'message-finished': 'Timer finished (optional)',
      'advanced-section': 'Advanced',
      'height': 'Height',
      'width': 'Width',
      'css-extra': 'Custom timer CSS (optional)',
      'template': 'Output template',
      'template-deletion': 'Beginning deletion vote at -10.\n\n%%iframe%%\n\nIf this article is over a year old, you are not the author, and you want to rewrite this article, request to do so in the [/forum/t-14018096/rewrite-request-thread#post-4916192 Rewrite Request Thread]. Please request permission from the author and make sure you copy the page source to your sandbox. **Do not reply to this post unless you are staff.**',
      'template-translation': '翻譯測試文字'
      'template-ban': '%%iframe%%',
      'message-deletion-progress': 'This page will be eligible for deletion in',
      'message-deletion-finished': 'This page has been eligible for deletion since',
      'message-translaton-progress': '倒數計時器翻譯',
      'message-translation-finished': '本翻譯已超過符合被刪除期限',          
      'message-ban-progress': 'This user\'s ban will elapse in',
      'message-ban-finished': 'This user\'s ban has been expired since',
      'build-timer': 'Build timer',
      'info-help': 'help',
      'info-source': 'source',
      'error-missing': 'Please make a selection in each section first.',
      'error-invalid': 'Invalid internal state, please file a bug report.',
    },

    // Pig Latin
    'pig': {
      'timer-description': 'Imertay expiringyay atyay',
      'timer-progress': 'Isthay imertay illway expireyay inyay',
      'timer-finished': 'Isthay imertay ashay eenbay expiredyay incesay',
      'timer-type': 'Imertay Ypetay',
      'timer-type-generic': 'Enericgay',
      'timer-type-deletion': 'Eletionday',
      'timer-type-ban': 'Anbay',
      'duration': 'Urationday',
      'duration-1d': '1 Aday',
      'duration-1w': '1 Eekway',
      'duration-2w': '2 Eeksway',
      'duration-1y': '1 Earyay',
      'duration-custom': 'Ustomcay',
      'unit-minute': 'inutesmay',
      'unit-hour': 'ourshay',
      'unit-day': 'aysday',
      'unit-week': 'eeksway',
      'unit-month': 'onthsmay',
      'unit-year': 'earsyay',
      'start-time': 'Artstay Imetay',
      'start-time-now': 'Ownay',
      'start-time-later': 'Aterlay',
      'messages': 'Essagesmay',
      'message-progress': 'Imertay in-progressyay (optionalyay)',
      'message-finished': 'Imertay inishedfay (optionalyay)',
      'advanced-section': 'Advancedyay',
      'height': 'Eighthay',
      'width': 'Idthway',
      'css-extra': 'Ustomcay imertay CSSYAY (optionalyay)',
      'template': 'Outputyay emplatetay',
      'template-deletion': 'Eginningbay eletionday otevay atyay -10.\n\n%%iframe%%\n\nIfyay isthay articleyay isyay overyay ayay earyay oldyay, ouyay areyay otnay ethay authoryay, andyay ouyay antway otay ewriteray isthay articleyay, equestray otay oday osay inyay ethay [/forum/t-14018096/rewrite-request-thread#post-4916192 Ewriteray Equestray Eadthray]. Easeplay equestray ermissionpay omfray ehtay authoryay andyay akemay uresay ouyay opycay ehtay agepay ourcesay otay ouryay andboxsay. **Oday otnay eplyray otay isthay ostay unlessyay ouyay areyay affstay.**',
      'template-translation': '翻譯測試文字'      
      'template-ban': '%%iframe%%',
      'message-deletion-progress': 'Isthay agepay illway ebay eligibleyay orfay eletionday inyay',
      'message-deletion-finished': 'Isthay agepay has been eligible for deletion since',
      'message-translaton-progress': '倒數計時器翻譯',
      'message-translation-finished': '本翻譯已超過符合被刪除期限',          
      'message-ban-progress': 'Isthay user\'syay anbay illway elapseyay inyay',
      'message-ban-finished': 'Isthay user\'syay anbay ashay eenbay expiredyay incesay',
      'build-timer': 'Uildbay imertay',
      'info-help': 'elphay',
      'info-source': 'ourcesay',
      'error-missing': 'Easeplay akemay ayay electionsay inyay eachyay ectionsay irstfay.',
      'error-invalid': 'Invalidyay internalyay atestay, easeplay ilefay ayay ugbay eportray.',
    },

    // Traditional Chinese
    'zh': {
      'timer-description': 'Timer expiring at',
      'timer-progress': '該計時器將於以下倒數結束後到期',
      'timer-finished': '該計時器現已到期',
      'timer-type': '計時器類型',
      'timer-type-generic': '通用',
      'timer-type-deletion': '刪文',
      'timer-type-ban': '封禁',
      'duration': '運行時間',
      'duration-1d': '1 天',
      'duration-1w': '1 星期',
      'duration-2w': '2 星期',
      'duration-1y': '1 年',
      'duration-custom': '自訂',
      'unit-minute': '分鐘',
      'unit-hour': '小時',
      'unit-day': '天',
      'unit-week': '星期',
      'unit-month': '月',
      'unit-year': '年',
      'start-time': '開始時間',
      'start-time-now': '現在',
      'start-time-later': '未來',
      'messages': '計時器訊息',
      'message-progress': '倒數過程中（選填）',
      'message-finished': '倒數結束後（選填）',
      'advanced-section': '進階選項',
      'height': '高',
      'width': '寬',
      'css-extra': '自訂計時器CSS（選填）',
      'template': '輸出模板',
      'template-deletion': '%%iframe%%\n\n本文將會於上述計時器歸零，又仍未回上至超過-2分時被刪除，敬請留意。',
      'template-translation': '翻譯測試文字'      
      'template-ban': '%%iframe%%',
      'message-deletion-progress': '倒數計時器',
      'message-deletion-finished': '本文已超過符合被刪除期限',
      'message-translaton-progress': '倒數計時器翻譯',
      'message-translation-finished': '本翻譯已超過符合被刪除期限',      
      'message-ban-progress': '該名用戶將在倒數結束後解除封禁',
      'message-ban-finished': '對該名用戶的封禁已到期',
      'build-timer': '產生計時器',
      'info-help': 'help',
      'info-source': 'source',
      'error-missing': 'Please make a selection in each section first.',
      'error-invalid': 'Invalid internal state, please file a bug report.',
    },
  };

  // Special case:
  // The 'test' language just echoes the message key back out.
  if (language === 'test') {
    return messageKey;
  }

  // Get message based on language
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

function insertCSS(styling) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');

  style.type = 'text/css';
  style.appendChild(document.createTextNode(styling));
  head.appendChild(style);
}

// Timer creation
function buildUrl(language, startDate, durationMs, progressMessage, finishedMessage, styling) {
  // Calculate target datetime
  var targetDate = new Date(startDate.getTime() + durationMs);

  // Finally, build URL
  var parameters = new URLSearchParams();
  parameters.append('lang', language);
  parameters.append('time', targetDate.toISOString());

  if (progressMessage) {
    parameters.append('progress', progressMessage);
  }

  if (finishedMessage) {
    parameters.append('finished', finishedMessage);
  }

  if (styling) {
    parameters.append('style', styling);
  }

  return 'https://viken-k.github.io/timer/timer.html?' + parameters;
}

function buildWikitext(template, url, height, width) {
  var iframe = [
    '[[iframe ', url, ' style="width: ', width, '; height: ', height, '; border: 0;"]]',
  ].join('');

  return template
    .replace('%%url%%', url)
    .replace('%%iframe%%', iframe);
}

function findCheckedItem(selector) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      return elements[i];
    }
  }

  alert(getMessage(language, 'error-missing'));
  throw new Error('Could not find a checked radio button item');
}

function getStartDate(language) {
  var element = findCheckedItem('#start input');
  switch (element.id) {
    case 'start-now':
      return new Date();
    case 'start-later':
      var dateElement = document.getElementById('start-later-date');
      var timeElement = document.getElementById('start-later-time');
      if (dateElement === null || timeElement === null) {
        alert(getMessage(language, 'error-missing'));
        throw new Error('Missing date or time element in getStartDate()');
      }

      return new Date(dateElement.value + ' ' + timeElement.value);
    default:
      alert(getMessage(language, 'error-invalid'));
      throw new Error('Invalid element ID in getStartDate()');
  }
}

function getDuration() {
  var element = findCheckedItem('#duration input');
  if (element.value !== 'custom') {
    return parseInt(element.value);
  }

  var valueElement = document.getElementById('duration-custom-value');
  var value = parseInt(valueElement.value);
  if (isNaN(value)) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('No value in custom duration selector');
  }

  var unitElement = document.getElementById('duration-custom-unit');
  var unit = parseInt(unitElement.value);

  return value * unit;
}

function getTextData(language) {
  var progressElement = document.getElementById('message-progress');
  if (progressElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing progress element in getTextData()');
  }

  var finishedElement = document.getElementById('message-finished');
  if (finishedElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing finished element in getTextData()');
  }

  var heightElement = document.getElementById('height');
  if (heightElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing height element in getTextData()');
  }

  var widthElement = document.getElementById('width');
  if (widthElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing width element in getTextData()');
  }

  var customCssElement = document.getElementById('custom-css');
  if (customCssElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing custom CSS element in getTextData()');
  }

  var templateElement = document.getElementById('template');
  if (templateElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing template element in getTextData()');
  }

  return {
    progressMessage: progressElement.value,
    finishedMessage: finishedElement.value,
    height: heightElement.value,
    width: widthElement.value,
    styling: customCssElement.value,
    template: templateElement.value,
  };
}

function buildTimer(language) {
  // Unhide output
  var outputElement = document.getElementById('output');
  outputElement.classList.remove('hidden');

  // Gather values
  var startDate = getStartDate(language);
  var durationMs = getDuration(language);
  var data = getTextData(language);

  // Build wikitext and output
  var url = buildUrl(
    language,
    startDate,
    durationMs,
    data.progressMessage,
    data.finishedMessage,
    data.styling,
  );

  outputElement.value = buildWikitext(data.template, url, data.height, data.width);
}

// Initialization
function initializeMessages(language) {
  function setMessage(id, messageKey = null) {
    document.getElementById(id).innerText = getMessage(language, messageKey || id);
  }

  var element;

  setMessage('timer-type-label', 'timer-type');
  setMessage('timer-type-generic-label', 'timer-type-generic');
  setMessage('timer-type-deletion-label', 'timer-type-deletion');
  setMessage('timer-type-translation-label', 'timer-type-translation');  
  setMessage('timer-type-ban-label', 'timer-type-ban');

  setMessage('start-label', 'start-time');
  setMessage('start-now-label', 'start-time-now');
  setMessage('start-later-label', 'start-time-later');

  setMessage('duration-label', 'duration');
  setMessage('duration-1d-label', 'duration-1d');
  setMessage('duration-1w-label', 'duration-1w');
  setMessage('duration-2w-label', 'duration-2w');
  setMessage('duration-1y-label', 'duration-1y');
  setMessage('duration-custom-label', 'duration-custom');

  setMessage('unit-minute');
  setMessage('unit-hour');
  setMessage('unit-day');
  setMessage('unit-week');
  setMessage('unit-month');
  setMessage('unit-year');

  setMessage('messages-label', 'messages');
  document.getElementById('message-progress').placeholder = getMessage(language, 'timer-progress');
  document.getElementById('message-finished').placeholder = getMessage(language, 'timer-finished');
  setMessage('message-progress-label', 'message-progress');
  setMessage('message-finished-label', 'message-finished');

  setMessage('advanced-label', 'advanced-section');
  setMessage('height-label', 'height');
  setMessage('width-label', 'width');
  setMessage('custom-css-label', 'css-extra');
  setMessage('template-label', 'template');
  document.getElementById('custom-css').placeholder = '#title {\n  color: #008080;\n}';

  setMessage('build', 'build-timer');
  setMessage('info-help');
  setMessage('info-source');
}

function initializeHooks(language) {
  document.getElementById('timer-type-generic').onclick = function () {
    document.getElementById('message-progress').value = '';
    document.getElementById('message-finished').value = '';
    document.getElementById('template').value = '%%iframe%%';
  };

  document.getElementById('timer-type-deletion').onclick = function () {
    document.getElementById('duration-1d').click();
    document.getElementById('message-progress').value = getMessage(language, 'message-deletion-progress');
    document.getElementById('message-finished').value = getMessage(language, 'message-deletion-finished');
    document.getElementById('template').value = getMessage(language, 'template-deletion');
  };

  document.getElementById('timer-type-translation').onclick = function () {
    document.getElementById('duration-1d').click();
    document.getElementById('message-progress').value = getMessage(language, 'message-translaton-progress');
    document.getElementById('message-finished').value = getMessage(language, 'message-translation-finished');
    document.getElementById('template').value = getMessage(language, 'template-translation');
  };

  document.getElementById('timer-type-ban').onclick = function () {
    document.getElementById('message-progress').value = getMessage(language, 'message-ban-progress');
    document.getElementById('message-finished').value = getMessage(language, 'message-ban-finished');
    document.getElementById('template').value = getMessage(language, 'template-ban');
  };

  function onClickStartDate() {
    document.getElementById('start-later').click();
  }

  document.getElementById('start-later-date').onclick = onClickStartDate;
  document.getElementById('start-later-time').onclick = onClickStartDate;

  function onClickCustom() {
    document.getElementById('duration-custom').click();
  }

  document.getElementById('duration-custom-value').onclick = onClickCustom;
  document.getElementById('duration-custom-unit').onclick = onClickCustom;

  document.getElementById('build').onclick = function () {
    buildTimer(language);
  };
}

function setup() {
  // Get parameters
  var url = new URL(window.location.href);
  var parameters = new URLSearchParams(url.search);
  var language = parameters.get('lang');
  var styling = parameters.get('style');

  // Check parameters
  if (!language) {
    setError('No language set', 'Parameter is "lang". Use "en" for English.');
    return;
  }

  // Insert custom CSS, if any
  if (styling !== null) {
    insertCSS(styling);
  }

  initializeMessages(language);
  initializeHooks(language);
}

setTimeout(setup, 5);