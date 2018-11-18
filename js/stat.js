'use strict';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var FONT_STYLE = '16px PT Mono';
var FONT_COLOR = '#000000';
var TEXT_WIN = 'Ура вы победили!';
var TEXT_YOU = 'Вы';
var TEXT_RESULT = 'Список результатов:';
var TEXT_BASELINE = 'hanging';
var TEXT_OFFSET = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_OFFSET = 40;
var YOU_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_COLOR = 'rgba(0, 0 , 255, ';

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxTime(times);
  renderCloud(ctx);
  renderHistogram(ctx, names, times, maxTime);
};
var renderCloud = function (ctx) {
  renderShape(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
  renderShape(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
  renderText(ctx, TEXT_WIN, CLOUD_X + TEXT_OFFSET, CLOUD_Y + TEXT_OFFSET);
  renderText(ctx, TEXT_RESULT, CLOUD_X + TEXT_OFFSET, CLOUD_Y + TEXT_OFFSET * 2);
};
var renderHistogram = function (ctx, names, times, maxTime) {
  var barX = CLOUD_X + BAR_OFFSET;
  var barY = CLOUD_Y + CLOUD_HEIGHT - BAR_OFFSET;
  for (var i = 0; i < names.length; i++) {
    var barHeight = times[i] * BAR_HEIGHT / maxTime;
    var offsetX = (BAR_WIDTH + BAR_GAP) * i;
    var сolor = (names[i] === TEXT_YOU) ? YOU_BAR_COLOR : getRandomBarColor();
    renderColumn(ctx, names[i], times[i], barX, barY, barHeight, offsetX, сolor);
  }
};
var renderColumn = function (ctx, name, time, x, y, barHeight, offsetX, color) {
  renderShape(ctx, x + offsetX, y - barHeight, BAR_WIDTH, barHeight, color);
  renderText(ctx, name, x + offsetX, y + TEXT_OFFSET / 2);
  renderText(ctx, Math.floor(time), x + offsetX, y - barHeight - TEXT_OFFSET);
};
var renderShape = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};
var renderText = function (ctx, text, x, y) {
  ctx.font = FONT_STYLE;
  ctx.fillStyle = FONT_COLOR;
  ctx.textBaseline = TEXT_BASELINE;
  ctx.fillText(text, x, y);
};
var getRandomBarColor = function () {
  return BAR_COLOR + Math.random() + ')';
};
var getMaxTime = function (times) {
  var maxTime = 0;
  for (var i = 0; i < times.length; i++) {
    maxTime = (times[i] > maxTime) ? times[i] : maxTime;
  }
  return maxTime;
};

