'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizardSetupForm = document.querySelector('.setup');

var similarWizardsListElement = wizardSetupForm.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardSetupOpenElement = document.querySelector('.setup-open');

var wizardSetupCloseElement = wizardSetupForm.querySelector('.setup-close');

var wizardSetupInputName = wizardSetupForm.querySelector('.setup-user-name');

var wizardSetupContainer = wizardSetupForm.querySelector('.setup-wizard');

var wizardSetupCoat = wizardSetupContainer.querySelector('.wizard-coat');

var wizardSetupEyes = wizardSetupContainer.querySelector('.wizard-eyes');

var wizardSetupFireballColor = document.querySelector('.setup-fireball-wrap');

var wizardSetupSubmitButton = wizardSetupForm.querySelector('.setup-submit');

var wizardSetupFormInputCoat = wizardSetupContainer.querySelector('input[name="coat-color"]'); // Не находит

var wizardSetupFormInputEyes = wizardSetupContainer.querySelector('input[name="eyes-color"]'); // Не находит

var wizardSetupFormInputFireballColor = wizardSetupFireballColor.querySelector('input[name="fireball-color"]'); // Не находит

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var makeWizardRandomName = function () {
  return WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ' ' + getRandomInt(0, WIZARD_SURNAMES.length - 1);
};

var makeWizardCoatColor = function () {
  return WIZARD_COAT_COLORS[getRandomInt(0, WIZARD_COAT_COLORS.length - 1)];
};

var makeWizardEyesColor = function () {
  return WIZARD_EYES_COLORS[getRandomInt(0, WIZARD_EYES_COLORS.length - 1)];
};

var makeWizardFireballColor = function () { // Не работает, не меняется цвет
  return WIZARD_FIREBALL_COLORS[getRandomInt(0, WIZARD_FIREBALL_COLORS.length - 1)];
};


var createWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = makeWizardRandomName();
  wizardElement.querySelector('.wizard-coat').style.fill = makeWizardCoatColor();
  wizardElement.querySelector('.wizard-eyes').style.fill = makeWizardEyesColor();
  return wizardElement;
};

var createWizardFragment = function () {
  var wizardFragment = document.createDocumentFragment();

  for (var i = 0; i < 4; i++) {
    wizardFragment.appendChild(createWizard());
  }
  return wizardFragment;
};

similarWizardsListElement.appendChild(createWizardFragment());

var onWizardSetupFormKeyDown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== wizardSetupInputName) {
    closeWizardSetupForm();
  } else if (evt.keyCode === ENTER_KEYCODE && evt.target === wizardSetupSubmitButton) {
    wizardSetupForm.submit();
  }
};

var openWizardSetupForm = function () {
  wizardSetupForm.classList.remove('hidden');
  document.addEventListener('keydown', onWizardSetupFormKeyDown);
};

var closeWizardSetupForm = function () {
  wizardSetupForm.classList.add('hidden');
  document.removeEventListener('keydown', onWizardSetupFormKeyDown);
};

var changeWizardCoatColor = function () {
  var wizardCoatColor = makeWizardCoatColor();
  wizardSetupCoat.style.fill = wizardCoatColor;
  wizardSetupFormInputCoat.setAttribute('value', wizardCoatColor); // Uncaught TypeError: Cannot set property 'value' of null
};

var changeWizardEyesColor = function () {
  var wizardEyesColor = makeWizardEyesColor();
  wizardSetupEyes.style.fill = wizardEyesColor;
  wizardSetupFormInputEyes.setAttribute('value', wizardEyesColor); // Uncaught TypeError: Cannot set property 'value' of null
};

var changeWizardFireballColor = function () {
  var randomFireballColor = makeWizardFireballColor();
  wizardSetupFireballColor.style.backgroundColor = randomFireballColor;
  wizardSetupFormInputFireballColor.setAttribute('value', randomFireballColor); // Uncaught TypeError: Cannot set property 'value' of null
};

wizardSetupOpenElement.addEventListener('click', openWizardSetupForm);

wizardSetupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openWizardSetupForm();
  }
});

wizardSetupCloseElement.addEventListener('click', closeWizardSetupForm);

wizardSetupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeWizardSetupForm();
  }
});

wizardSetupCoat.addEventListener('click', changeWizardCoatColor);

wizardSetupEyes.addEventListener('click', changeWizardEyesColor);

wizardSetupFireballColor.addEventListener('click', changeWizardFireballColor);

