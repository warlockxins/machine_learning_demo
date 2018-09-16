var canvas;
var ctx;

var circleSize = 30;
var offsetX = circleSize * 2 + 40;
var offsetY = circleSize * 2 + 10;

function drawNodes(net) {
  net.m_layers.forEach(function(layer, indexX) {
    layer.forEach(function(node, indexY) {
      ctx.beginPath();
      ctx.arc(
        offsetX + indexX * offsetX,
        offsetY + indexY * offsetY,
        circleSize,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    });
  });
}

function drawNetwork(net) {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawNodes(net);
}
