'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_SHADOW_GAP = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_TEXT_HEIGHT = 16;
var CLOUD_TEXT_FONT = '16px PT MONO';
var CLOUD_TEXT_GAP = 10;
var CLOUD_TEXT_BOTTOM_POSITION = 'bottom';
var CLOUD_TEXT_TOP_POSITION = 'top';
var CLOUD_TEXT_COLOR = '#000';
var CLOUD_FIRST_MESSAGE_PHRASE = 'Ура вы победили!';
var CLOUD_SECOND_MESSAGE_PHRASE = 'Список результатов:';
var STAT_BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var STAT_BAR_GAP = 50;
var PLAYER_NAME = 'Вы';
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

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

var getRandomBlueColor = function () {
  var random = function (min, max) {
    return Math.random() * (max - min) + min;
  };
  return 'rgba(0, 0, 250, ' + precise(random(0.2, 0.9)) + ')';
};

var renderText = function (ctx, color, font, baseline, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};

var renderStatBar = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_GAP, CLOUD_Y + CLOUD_SHADOW_GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  var MessageX = CLOUD_X + CLOUD_TEXT_GAP;
  var firstMessageY = CLOUD_TEXT_GAP * 3;
  var secondMessageY = CLOUD_TEXT_HEIGHT + CLOUD_TEXT_GAP * 3;
  renderText(ctx, CLOUD_TEXT_COLOR, CLOUD_TEXT_FONT, CLOUD_TEXT_TOP_POSITION, CLOUD_FIRST_MESSAGE_PHRASE, MessageX, firstMessageY);
  renderText(ctx, CLOUD_TEXT_COLOR, CLOUD_TEXT_FONT, CLOUD_TEXT_TOP_POSITION, CLOUD_SECOND_MESSAGE_PHRASE, MessageX, secondMessageY);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var randomBarColor = getRandomBlueColor();
    var playerColor = (players[i] === PLAYER_NAME) ? PLAYER_BAR_COLOR : randomBarColor;
    var resultsStat = Math.floor(times[i]);
    var playersNames = players[i];
    var statisticsX = CLOUD_X + STAT_BAR_GAP + (STAT_BAR_GAP + STAT_BAR_WIDTH) * i;
    var statBarHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var playersResultsY = CLOUD_Y + CLOUD_TEXT_HEIGHT * 2 + CLOUD_TEXT_GAP * 5 + MAX_BAR_HEIGHT - statBarHeight;
    var playersNamesY = CLOUD_Y + CLOUD_TEXT_HEIGHT * 3 + CLOUD_TEXT_GAP * 4 + MAX_BAR_HEIGHT - statBarHeight;
    renderText(ctx, CLOUD_TEXT_COLOR, CLOUD_TEXT_FONT, CLOUD_TEXT_BOTTOM_POSITION, resultsStat, statisticsX, playersResultsY);
    renderText(ctx, CLOUD_TEXT_COLOR, CLOUD_TEXT_FONT, CLOUD_TEXT_BOTTOM_POSITION, playersNames, statisticsX, CLOUD_Y + CLOUD_HEIGHT - CLOUD_TEXT_GAP);
    renderStatBar(ctx, playerColor, statisticsX, playersNamesY, STAT_BAR_WIDTH, statBarHeight);
  }
};
