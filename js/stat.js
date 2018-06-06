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

  return maxElement;
};

function precise(x) {
  return Number.parseFloat(x).toPrecision(1);
}

var getRandomColor = function () {
  return 'rgba(0, 0, 250, ' + precise(Math.random()) + ')';
};

var writeColoredText = function (ctx, color, font, position, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = position;
  ctx.fillText(text, x, y);
};

var renderRect = function (ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);

  writeColoredText(ctx, BLACK_COLOR, TEXT_FONT, TEXT_TOP, FIRST_MESSAGE_PHRASE, CLOUD_X + TEXT_GAP, TEXT_GAP * 3);
  writeColoredText(ctx, BLACK_COLOR, TEXT_FONT, TEXT_TOP, SECOND_MESSAGE_PHRASE, CLOUD_X + TEXT_GAP, TEXT_HEIGHT + TEXT_GAP * 3);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var randomColor = getRandomColor();
    writeColoredText(ctx, BLACK_COLOR, TEXT_FONT, TEXT_BOTTOM, Math.floor(times[i]), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT * 2 + TEXT_GAP * 5 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime));
    writeColoredText(ctx, BLACK_COLOR, TEXT_FONT, TEXT_BOTTOM, players[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP);
    ctx.fillStyle = (players[i] === LAST_PLAYER) ? 'rgba(255, 0, 0, 1)' : randomColor;
    renderRect(ctx, CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT * 3 + TEXT_GAP * 4 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
