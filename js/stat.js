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
var STAT_COLUMN_WIDTH = 40;
var MAX_COLUMN_HEIGHT = 150;
var STAT_COLUMN_GAP = 50;
var PLAYER_NAME = 'Вы';
var PLAYER_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


var getRandomBlueColor = function () {
  return 'rgba(0, 0, 250, ' + clamp(Math.random().toFixed(2), 0.2, 0.9) + ')';
};

var renderText = function (ctx, color, font, baseline, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};

var renderStatColumn = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_GAP, CLOUD_Y + CLOUD_SHADOW_GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  var messageX = CLOUD_X + CLOUD_TEXT_GAP;
  var firstMessageY = CLOUD_TEXT_GAP * 3;
  var secondMessageY = CLOUD_TEXT_HEIGHT + CLOUD_TEXT_GAP * 3;
  renderText(ctx, CLOUD_TEXT_COLOR, CLOUD_TEXT_FONT, CLOUD_TEXT_TOP_POSITION, CLOUD_FIRST_MESSAGE_PHRASE, messageX, firstMessageY);
  renderText(ctx, CLOUD_TEXT_COLOR, CLOUD_TEXT_FONT, CLOUD_TEXT_TOP_POSITION, CLOUD_SECOND_MESSAGE_PHRASE, messageX, secondMessageY);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var randomColumnColor = getRandomBlueColor();
    var playerColor = (players[i] === PLAYER_NAME) ? PLAYER_COLUMN_COLOR : randomColumnColor;
    var playerTime = Math.floor(times[i]);
    var statisticX = CLOUD_X + STAT_COLUMN_GAP + (STAT_COLUMN_GAP + STAT_COLUMN_WIDTH) * i;
    var statColumnHeight = (MAX_COLUMN_HEIGHT * times[i]) / maxTime;
    var playerTimeY = CLOUD_Y + CLOUD_TEXT_HEIGHT * 2 + CLOUD_TEXT_GAP * 5 + MAX_COLUMN_HEIGHT - statColumnHeight;
    var playerNameY = CLOUD_Y + CLOUD_HEIGHT - CLOUD_TEXT_GAP;
    var statColumnY = CLOUD_Y + CLOUD_TEXT_HEIGHT * 3 + CLOUD_TEXT_GAP * 4 + MAX_COLUMN_HEIGHT - statColumnHeight;
    renderText(ctx, CLOUD_TEXT_COLOR, CLOUD_TEXT_FONT, CLOUD_TEXT_BOTTOM_POSITION, playerTime, statisticX, playerTimeY);
    renderText(ctx, CLOUD_TEXT_COLOR, CLOUD_TEXT_FONT, CLOUD_TEXT_BOTTOM_POSITION, players[i], statisticX, playerNameY);
    renderStatColumn(ctx, playerColor, statisticX, statColumnY, STAT_COLUMN_WIDTH, statColumnHeight);
  }
};
