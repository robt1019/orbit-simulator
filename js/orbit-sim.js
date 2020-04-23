window.addEventListener("load", function () {
  const drawSystem2D = function (canvas, systemState) {
    const conversionFactor = canvas.height / (systemState.center.radius * 150);
    
    canvas2D.clear(canvas, "black");

    [systemState.center].concat(systemState.planets).forEach(function (planet) {
      let x, y;
      if (planet.isCenterOfSystem) {
        x = canvas.width / 2;
        y = canvas.height / 2;
      } else {
        x = canvas.width / 2 + planet.distanceFromCenter * conversionFactor;
        y = canvas.height / 2;
        canvas2D.drawCircle(
          canvas,
          canvas.width / 2,
          canvas.height / 2,
          planet.distanceFromCenter * conversionFactor,
          planet.color,
          false
        );
      }
      canvas2D.drawCircle(
        canvas,
        x,
        y,
        planet.radius * conversionFactor,
        planet.color,
        true
      );
    });
  };

  let orbitSession = undefined;

  const canvas = document.querySelector("#orbitCanvas");

  canvas2D.fitCanvasToScreen(canvas, window);

  const system = sunMoonSystemSimulator;

  drawSystem2D(canvas, system.state());

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
    drawSystem2D(canvas, system.state());
  });
});
