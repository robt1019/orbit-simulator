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

const planetSystem = function (canvas) {
  canvas = canvas2D(canvas);

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
    canvas.clear("black");
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
      canvas.drawCircle(
        canvas.width / 2,
        canvas.height / 2,
        planet.distanceFromCenter * conversionFactor,
        planet.color,
        false
      );
    }
    canvas.drawCircle(
      x,
      y,
      planet.radius * conversionFactor,
      planet.color,
      true
    );
  };

  const tick = function () {
    console.log("ticky");
  };

  return {
    addPlanet,
    draw,
    tick,
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
    tick: system.tick,
  };
};

window.addEventListener("load", function () {
  let orbitSession = undefined;

  const fitCanvasToScreen = function (canvas) {
    canvas.height = window.innerHeight * 0.9;
    canvas.width = window.innerWidth * 0.99;
  };

  const canvas = document.querySelector("#orbitCanvas");
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
