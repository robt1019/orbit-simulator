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
    conversionFactor = canvas.height / (biggestPlanetRadius * 5);
    clearCanvas();
    drawPlanet(center);

    _planets.forEach(function (planet) {
      drawPlanet(planet);
    });
  };

  const drawPlanet = function (planet) {
    const [x, y] = planet.position;
    ctx.beginPath();
    ctx.fillStyle = planet.color;
    ctx.arc(
      (x / 100) * canvas.width,
      (y / 100) * canvas.height,
      planet.radius * conversionFactor,
      0,
      2 * Math.PI
    );
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
    position: [50, 50],
    color: "green",
    isCenterOfSystem: true,
  });

  system.addPlanet({
    name: "Moon",
    radius: 1736000,
    mass: 1.348 * Math.pow(10, 22),
    position: [90, 90],
    color: "grey",
  });

  return {
    drawSolarSystem: system.draw,
  };
};

window.addEventListener("load", function () {
  const startSimulationButton = document.querySelector(
    "#startSimulationButton"
  );

  const canvas = document.querySelector("#orbitCanvas");

  const system = sunMoonSystemSimulator(canvas);
  canvas.height = window.innerHeight * 0.9;
  canvas.width = window.innerWidth * 0.99;

  window.addEventListener("resize", function () {
    setTimeout(function () {
      canvas.height = window.innerHeight * 0.9;
      canvas.width = window.innerWidth * 0.99;
      system.drawSolarSystem();
    });
  });

  system.drawSolarSystem();
});
