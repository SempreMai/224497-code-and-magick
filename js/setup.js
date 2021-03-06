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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

var makeWizardRandomName = function () {
  var randomWizardName = clamp(Math.floor(Math.random() * 10), 0, WIZARD_NAMES.length - 1);
  var randomWizardSurname = clamp(Math.floor(Math.random() * 10), 0, WIZARD_SURNAMES.length - 1);
  return WIZARD_NAMES[randomWizardName] + ' ' + WIZARD_SURNAMES[randomWizardSurname];
};

var makeWizardCoatColor = function () {
  var wizardCoatsArrLength = WIZARD_COAT_COLORS.length - 1;
  var randomWizardCoatColor = clamp(Math.floor(Math.random() * 10), 0, wizardCoatsArrLength);
  return WIZARD_COAT_COLORS[randomWizardCoatColor];
};

var makeWizardEyesColor = function () {
  var wizardEyesArray = WIZARD_EYES_COLORS.length - 1;
  var randomWizardEyesColor = clamp(Math.floor(Math.random() * 10), 0, wizardEyesArray);
  return WIZARD_EYES_COLORS[randomWizardEyesColor];
};

var userSetupElement = document.querySelector('.setup');

var similarWizardsListElement = userSetupElement.querySelector('.setup-similar-list');

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

userSetupElement.classList.remove('hidden');

userSetupElement.querySelector('.setup-similar').classList.remove('hidden');

