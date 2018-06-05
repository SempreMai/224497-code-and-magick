'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var TEXT_HEIGHT = 16;
var TEXT_FONT = '16px MONO';
var TEXT_GAP = 10;
var TEXT_BOTTOM = 'bottom';
var TEXT_TOP = 'top';
var FIRST_MESSAGE_PHRASE = 'Ура вы победили!';
var SECOND_MESSAGE_PHRASE = 'Список результатов:';
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var LAST_PLAYER = 'Вы';
var BLACK_COLOR = '#000';
var WHITE_COLOR = '#fff';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return Math.floor(maxElement);
};

var getRandomArbitrary = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getColor = function () {
  return 'rgb(19, 48, ' + String(getRandomArbitrary(50, 160)) + ')';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);

  ctx.fillStyle = BLACK_COLOR;
  ctx.font = TEXT_FONT;
  ctx.textBaseline = TEXT_TOP;
  ctx.fillText(FIRST_MESSAGE_PHRASE, CLOUD_X + TEXT_GAP, TEXT_GAP * 3);
  ctx.fillText(SECOND_MESSAGE_PHRASE, CLOUD_X + TEXT_GAP, TEXT_HEIGHT + TEXT_GAP * 3);

  var maxTime = getMaxElement(times);
  var randomColor = getColor();

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = BLACK_COLOR;
    ctx.textBaseline = TEXT_BOTTOM;
    ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT * 2 + TEXT_GAP * 5 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime));
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP);
    ctx.fillStyle = (players[i] === LAST_PLAYER) ? 'rgba(255, 0, 0, 1)' : randomColor;
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT * 3 + TEXT_GAP * 4 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
