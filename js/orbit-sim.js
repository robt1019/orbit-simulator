window.addEventListener("load", function () {

  let orbitSession = undefined;

  const canvas = document.querySelector("#orbitCanvas");

  canvas2D.fitCanvasToScreen(canvas, window);

  const system = sunMoonSystemSimulator;

  planetSystemPainter.drawSystem2D(canvas, system.state());

  const toggleSimButton = document.querySelector("#toggleSimulationButton");

  toggleSimButton.addEventListener("click", function () {
    if (!orbitSession) {
      toggleSimButton.textContent = 'Stop Simulation'
      orbitSession = setInterval(function () {
        console.log(system.tick());
      }, 500);
      isTicking = true;
    } else {
      clearInterval(orbitSession);  
      orbitSession = undefined;
      toggleSimButton.textContent = 'Start Simulation'
    }
  });

  window.addEventListener("resize", function () {
    canvas2D.fitCanvasToScreen(canvas, window);
    planetSystemPainter.drawSystem2D(canvas, system.state());
  });
});
