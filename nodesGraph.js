var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.stroke();
  };
}

var list = [];
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    var c = new Circle(40 + i * 85, 40 + j * 85);
    list.push(c);
  }
}

for (var k = 0; k < list.length; k++) {
  list[k].draw();
}
