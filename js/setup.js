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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

var makeWizardRandomName = function () {
  var randomWizardName = clamp(Math.floor(Math.random() * 10), 0, WIZARD_NAMES.length - 1);
  var randomWizardSurname = clamp(Math.floor(Math.random() * 10), 0, WIZARD_SURNAMES.length - 1);
  return WIZARD_NAMES[randomWizardName] + ' ' + WIZARD_SURNAMES[randomWizardSurname];
};

var makeWizardCoatColor = function () {
  var wizardCoatsArray = WIZARD_COAT_COLORS.length - 1;
  var randomWizardCoatColor = clamp(Math.floor(Math.random() * 10), 0, wizardCoatsArray);
  return WIZARD_COAT_COLORS[randomWizardCoatColor];
};

var makeWizardEyesColor = function () {
  var wizardEyesArray = WIZARD_EYES_COLORS.length - 1;
  var randomWizardEyesColor = clamp(Math.floor(Math.random() * 10), 0, wizardEyesArray);
  return WIZARD_EYES_COLORS[randomWizardEyesColor];
};

var wizardSetupForm = document.querySelector('.setup');

var similarWizardsListElement = wizardSetupForm.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

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
  wizardSetupFormInputCoat.value = wizardCoatColor;
};

var changeWizardEyesColor = function () {
  var wizardEyesColor = makeWizardEyesColor();
  wizardSetupEyes.style.fill = wizardEyesColor;
  wizardSetupFormInputEyes.value = wizardEyesColor; // Uncaught TypeError: Cannot set property 'value' of null
};

var changeWizardFireballColor = function () { // Не работает, не меняется цвет
  var randomFireballColor = WIZARD_FIREBALL_COLORS[clamp(Math.floor(Math.random() * 10), 0, WIZARD_FIREBALL_COLORS.length - 1)];
  wizardSetupFormInputFireballColor.value = randomFireballColor; // Uncaught TypeError: Cannot set property 'value' of null
  return randomFireballColor;
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

