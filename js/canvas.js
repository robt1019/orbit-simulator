const canvas2D = function (canvas) {
  const ctx = canvas.getContext("2d");

  const clear = function (color) {
    ctx.fillStyle = color || "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawCircle = function (x, y, radius, color, fill) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    fill ? ctx.fill() : ctx.stroke();
  };

  return {
    clear,
    drawCircle,
    width: canvas.width,
    height: canvas.height,
  };
};
