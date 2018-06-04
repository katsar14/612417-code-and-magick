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

var coordinates = {
  '1': [CLOUD_WIDTH / 10, CLOUD_HEIGHT / 10],
  '2': [CLOUD_WIDTH / 5, 0],
  '3': [CLOUD_WIDTH / 10 * 8, 0],
  '4': [CLOUD_WIDTH / 10 * 9, CLOUD_HEIGHT / 10],
  '5': [CLOUD_WIDTH, 0],
  '6': [CLOUD_WIDTH, CLOUD_HEIGHT],
  '7': [CLOUD_WIDTH / 10 * 9, CLOUD_HEIGHT / 10 * 9],
  '8': [CLOUD_WIDTH / 10 * 8, CLOUD_HEIGHT],
  '9': [CLOUD_WIDTH / 5, CLOUD_HEIGHT],
  '10': [CLOUD_WIDTH / 10, CLOUD_HEIGHT / 10 * 9],
  '11': [0, CLOUD_HEIGHT]
};

var renderCloud = function (ctx, x, y, coords, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (var key in coords) {
    if (coords.hasOwnProperty(key)) {
      ctx.lineTo(x + coords[key][0], y + coords[key][1]);
    }
  }
  ctx.closePath();
  ctx.fill();
};

var messages = [
  {
    text: 'Ура вы победили!',
    coordX: 235,
    coordY: 30
  },
  {
    text: 'Список результатов:',
    coordX: 225,
    coordY: 45
  }
];

var renderMessages = function (ctx, color, font, msg) {
  ctx.fillStyle = color;
  ctx.font = font;
  for (var i = 0; i < msg.length; i++) {
    ctx.fillText(msg[i].text, msg[i].coordX, msg[i].coordY);
  }
};

window.renderStatistics = function (ctx, names, times) {
  // Облако
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, coordinates, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, coordinates, '#fff');

  // Сообщение
  renderMessages(ctx, '#000', '16px PT Mono', messages);

  // Построение гистограммы
  var columnHeight = 0;
  var maxTime = getMaxNumber(times);

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
    ctx.fillRect(HISTO_X + GAP * i + COLUMN_WIDTH * i, HISTO_Y - columnHeight - TEXT_HEIGHT, COLUMN_WIDTH, columnHeight);

    ctx.fillStyle = '#000';
    ctx.textBaseline = 'bottom';
    ctx.fillText(names[i], HISTO_X + GAP * i + COLUMN_WIDTH * i, HISTO_Y);
    ctx.fillText(Math.round(times[i]), HISTO_X + GAP * i + COLUMN_WIDTH * i, HISTO_Y - columnHeight - TEXT_HEIGHT);
  }
};
