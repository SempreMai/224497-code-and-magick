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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

var getRandomWizardName = function () {
  var nameArrLength = WIZARD_NAMES.length - 1;
  var surnameArrLength = WIZARD_SURNAMES.length - 1;
  var randomWizardName = clamp(Math.random().toFixed(0), 0, nameArrLength);
  var randomWizardSurname = clamp(Math.random().toFixed(0), 0, surnameArrLength);
  return WIZARD_NAMES[randomWizardName] + ' ' + WIZARD_SURNAMES[randomWizardSurname];
};

var getRandomCoatColor = function () {
  var wizardCoatsArrLength = WIZARD_COAT_COLORS.length - 1;
  var randomWizardCoatColor = clamp(Math.random().toFixed(0), 0, wizardCoatsArrLength);
  return WIZARD_COAT_COLORS[randomWizardCoatColor];
};

var getRandomEyesColor = function () {
  var wizardEyesArrLength = WIZARD_EYES_COLORS.length - 1;
  var randomWizardEyesColor = clamp(Math.random().toFixed(0), 0, wizardEyesArrLength);
  return WIZARD_EYES_COLORS[randomWizardEyesColor];
};

var wizards = [
  {
    name: getRandomWizardName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyesColor()
  },
  {
    name: getRandomWizardName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyesColor()
  },
  {
    name: getRandomWizardName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyesColor()
  },
  {
    name: getRandomWizardName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyesColor()
  }
];


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

