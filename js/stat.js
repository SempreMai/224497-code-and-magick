'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var MESSAGE_HEIGHT = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var randomColor = 0;
var maxElement = 0;
var maxTime = 0;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return Math.floor(maxElement);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT MONO';
  ctx.textBaseline = 'top';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, MESSAGE_HEIGHT + GAP * 2);

  maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'bottom';
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    randomColor = 'rgba' + '(' + '15, ' + '82, ' + '186, ' + String(0.3 + i / 10) + ')';
    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : randomColor;
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + 2 * MESSAGE_HEIGHT + 2 * GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
