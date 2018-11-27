'use strict';
// ----------------------------------------------------------------------------
var PLAYERS_COUNT = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
// ----------------------------------------------------------------------------
var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// ----------------------------------------------------------------------------
var render = function (players) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < PLAYERS_COUNT; i++) {
    var element = document.querySelector('#similar-wizard-template').content.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent = players[i].name;
    element.querySelector('.wizard-coat').style.fill = players[i].coatColor;
    element.querySelector('.wizard-eyes').style.fill = players[i].eyesColor;
    fragment.appendChild(element);
  }
  document.querySelector('.setup-similar-list').appendChild(fragment);
};
// ----------------------------------------------------------------------------
var getDataArray = function () {
  var result = [];
  for (var i = 0; i < PLAYERS_COUNT; i++) {
    result.push({
      name: NAMES[getRandomNum(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomNum(0, SURNAMES.length - 1)],
      coatColor: COAT_COLORS[getRandomNum(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[getRandomNum(0, EYES_COLORS.length - 1)]
    });
  }
  return result;
};
// ----------------------------------------------------------------------------
var initiate = function () {
  document.querySelector('.setup').classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
  render(getDataArray());
};
// ----------------------------------------------------------------------------
initiate();
// ----------------------------------------------------------------------------
