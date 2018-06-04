'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 50;
var COLUMN_WIDTH = 40;
var HISTO_X = 160;
var HISTO_Y = 250;
var COLUMN_MAX_HEIGHT = 150;
var TEXT_HEIGHT = 20;
var columnHeight = 0;

var getMaxNumber = function (array) {
  var max = array[0];
  for (var i = 1; i < array.length; i++) {
    if (max < array[i]) {
      max = array[i];
    }
  }
  return max;
};

var getRandomNumber = function () {
  return Math.ceil(Math.random() * 254);
};


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 10, y + CLOUD_HEIGHT / 10);
  ctx.lineTo(x + CLOUD_WIDTH / 5, y);
  ctx.lineTo(x + CLOUD_WIDTH / 10 * 8, y);
  ctx.lineTo(x + CLOUD_WIDTH / 10 * 9, y + CLOUD_HEIGHT / 10);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 10 * 9, y + CLOUD_HEIGHT / 10 * 9);
  ctx.lineTo(x + CLOUD_WIDTH / 10 * 8, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 5, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 10, y + CLOUD_HEIGHT / 10 * 9);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.closePath();
  ctx.fill();
};

window.renderStatistics = function (ctx, names, times) {
  // Облако
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Сообщение
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 235, 30);
  ctx.fillText('Список результатов:', 225, 45);

  // Построение гистограммы
  var maxTime = getMaxNumber(times);
  ctx.translate(HISTO_X, HISTO_Y);

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgb(0, 0, ' + getRandomNumber() + ')';
    }

    if (times[i] === maxTime) {
      columnHeight = COLUMN_MAX_HEIGHT;
    } else {
      columnHeight = times[i] * COLUMN_MAX_HEIGHT / maxTime;
    }
    ctx.fillRect(GAP * i + COLUMN_WIDTH * i, -columnHeight - TEXT_HEIGHT, COLUMN_WIDTH, columnHeight);

    ctx.fillStyle = '#000';
    ctx.textBaseline = 'bottom';
    ctx.fillText(names[i], GAP * i + COLUMN_WIDTH * i, 0);
    ctx.fillText(Math.round(times[i]), GAP * i + COLUMN_WIDTH * i, -columnHeight - TEXT_HEIGHT);
  }
};
