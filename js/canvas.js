const canvas2D = (function () {

  const clear = function (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawCircle = function (canvas, x, y, radius, color, fill) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    fill ? ctx.fill() : ctx.stroke();
  };

  const fitCanvasToScreen = function (canvas, wdow) {
    canvas.height = wdow.innerHeight * 0.9;
    canvas.width = wdow.innerWidth * 0.99;
  };


  return {
    clear,
    drawCircle,
    fitCanvasToScreen,
  };
})();
