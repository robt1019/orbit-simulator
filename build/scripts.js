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
    canvas.height = wdow.innerHeight * 0.8;
    canvas.width = wdow.innerWidth * 0.99;
  };


  return {
    clear,
    drawCircle,
    fitCanvasToScreen,
  };
})();

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

const planetSystemPainter = (function() {
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

  return {
      drawSystem2D
  }
})()
const planetSystem = (function () {

  const planets = [];
  let center;

  const addPlanet = function (planet) {
    if (planet.isCenterOfSystem) {
      center = planet;
    } else {
      planets.push(planet);
    }
 };

  const tick = function () {
    return planets;
  };

  return {
    addPlanet,
    tick,
    state: function() { return {center, planets}}
  };
})();

const sunMoonSystemSimulator = (function () {
  const system = planetSystem;

  system.addPlanet({
    name: "Earth",
    radius: 6371000,
    mass: 5.972 * Math.pow(10, 24),
    color: "green",
    isCenterOfSystem: true,
  });

  system.addPlanet({
    name: "Moon",
    radius: 1736000,
    mass: 1.348 * Math.pow(10, 22),
    color: "grey",
    distanceFromCenter: 384400000,
  });

  return {
    ...system,
  };
})();
