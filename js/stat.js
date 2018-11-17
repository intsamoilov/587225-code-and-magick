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
  var maxTime = getMaxValue(times);
  renderCloud(ctx);
  renderHistogram(ctx, names, times, maxTime);
};
var renderCloud = function (ctx) {
  renderShape(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
  renderShape(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
  renderText(ctx, FONT_STYLE, FONT_COLOR, TEXT_BASELINE, TEXT_WIN, CLOUD_X + TEXT_OFFSET, CLOUD_Y + TEXT_OFFSET);
  renderText(ctx, FONT_STYLE, FONT_COLOR, TEXT_BASELINE, TEXT_RESULT, CLOUD_X + TEXT_OFFSET, CLOUD_Y + TEXT_OFFSET * 2);
};
var renderHistogram = function (ctx, names, times, maxTime) {
  var barX = CLOUD_X + BAR_OFFSET;
  var barY = CLOUD_Y + CLOUD_HEIGHT - BAR_OFFSET;
  for (var i = 0; i < names.length; i++) {
    var tempBarHeight = times[i] * BAR_HEIGHT / maxTime;
    var tempOffsetX = (BAR_WIDTH + BAR_GAP) * i;
    var tempRandomColor = getRandomColor();
    var tempColor = (names[i] === TEXT_YOU) ? YOU_BAR_COLOR : tempRandomColor;
    renderColumn(ctx, names[i], times[i], barX, barY, tempBarHeight, tempOffsetX, tempColor);
  }
};
var renderColumn = function (ctx, name, time, x, y, barHeight, offsetX, color) {
  renderShape(ctx, x + offsetX, y - barHeight, BAR_WIDTH, barHeight, color);
  renderText(ctx, FONT_STYLE, FONT_COLOR, TEXT_BASELINE, name, x + offsetX, y + TEXT_OFFSET / 2);
  renderText(ctx, FONT_STYLE, FONT_COLOR, TEXT_BASELINE, Math.floor(time), x + offsetX, y - barHeight - TEXT_OFFSET);
};
var renderShape = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};
var renderText = function (ctx, font, color, baseline, text, x, y) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};
var getRandomColor = function () {
  return BAR_COLOR + Math.random() + ')';
};
var getMaxValue = function (temp) {
  var maxValue = 0;
  for (var i = 0; i < temp.length; i++) {
    maxValue = (temp[i] > maxValue) ? temp[i] : maxValue;
  }
  return maxValue;
};

