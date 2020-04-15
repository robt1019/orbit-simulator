const planetSystem = function (canvas) {
  const ctx = canvas.getContext("2d");

  const _planets = [];
  let center;
  let biggestPlanetRadius = 0;
  let conversionFactor;

  const addPlanet = function (planet) {
    if (planet.isCenterOfSystem) {
      center = planet;
    } else {
      _planets.push(planet);
    }
    if (planet.radius > biggestPlanetRadius) {
      biggestPlanetRadius = planet.radius;
    }
  };

  const draw = function () {
    conversionFactor = canvas.height / (biggestPlanetRadius * 150);
    clearCanvas();
    drawPlanet(center);

    _planets.forEach(function (planet) {
      drawPlanet(planet);
    });
  };

  const drawPlanet = function (planet) {
    let x, y;
    if (planet.isCenterOfSystem) {
      x = canvas.width / 2;
      y = canvas.height / 2;
    } else {
      x = canvas.width / 2 + planet.distanceFromCenter * conversionFactor;
      y = canvas.height / 2;
      ctx.beginPath();
      ctx.fillStyle = planet.color;
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        planet.distanceFromCenter * conversionFactor,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.fillStyle = planet.color;
    ctx.arc(x, y, planet.radius * conversionFactor, 0, 2 * Math.PI);
    ctx.fill();
  };

  const clearCanvas = function () {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return {
    addPlanet,
    draw,
  };
};

const sunMoonSystemSimulator = function (canvas) {
  const system = planetSystem(canvas);

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
    draw: system.draw,
  };
};

window.addEventListener("load", function () {
  const fitCanvasToScreen = function (canvas) {
    canvas.height = window.innerHeight * 0.9;
    canvas.width = window.innerWidth * 0.99;
  };

  const canvas = document.querySelector("#orbitCanvas");
  fitCanvasToScreen(canvas);

  const system = sunMoonSystemSimulator(canvas);

  window.addEventListener("resize", function () {
    fitCanvasToScreen(canvas);
    system.draw();
  });

  system.draw();
});
