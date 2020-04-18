window.addEventListener("load", function () {
  let orbitSession = undefined;

  const canvas = document.querySelector("#orbitCanvas");

  const fitCanvasToScreen = function (canvas) {
    canvas.height = window.innerHeight * 0.9;
    canvas.width = window.innerWidth * 0.99;
  };

  fitCanvasToScreen(canvas);

  const system = sunMoonSystemSimulator(canvas);

  const startButton = document.querySelector("#startSimulationButton");

  startButton.addEventListener("click", function () {
    if (!orbitSession) {
      orbitSession = setInterval(function () {
        system.tick();
        system.draw();
      }, 500);
      isTicking = true;
    } else {
      clearInterval(orbitSession);
      orbitSession = undefined;
    }
  });

  system.draw();

  window.addEventListener("resize", function () {
    fitCanvasToScreen(canvas);
    system.draw();
  });
});
