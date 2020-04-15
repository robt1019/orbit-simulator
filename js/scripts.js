const planetSystem = function (canvas) {
  const ctx = canvas.getContext("2d");

  const _planets = [];
  let biggestPlanetRadius = 0;
  let conversionFactor;

  const addPlanet = function (planet) {
    _planets.push(planet);
    if (planet.radius > biggestPlanetRadius) {
      biggestPlanetRadius = planet.radius;
    }
    conversionFactor = canvas.height / (biggestPlanetRadius * 3);
  };

  const draw = function () {
    clearCanvas();
    _planets.forEach(function (planet) {
      const [x, y] = planet.position;
      ctx.beginPath();
      ctx.fillStyle = planet.color;
      ctx.arc(x, y, planet.radius * conversionFactor, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const clearCanvas = function () {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return {
    addPlanet,
    draw,
  };
};

const solarSystemSimulator = function (canvas) {
  const solarSystem = planetSystem(canvas);

  solarSystem.addPlanet({
    name: "Earth",
    radius: 6371000,
    mass: 5.972 * Math.pow(10, 24),
    position: [30, 50],
    color: "green",
  });

  solarSystem.addPlanet({
    name: "Sun",
    radius: 696340000,
    mass: 1.989 * Math.pow(10, 30),
    position: [200, 200],
    color: "red",
  });

  return {
    drawSolarSystem: solarSystem.draw,
  };
};

window.addEventListener("load", function () {
  const startSimulationButton = document.querySelector(
    "#startSimulationButton"
  );

  const system = solarSystemSimulator(document.querySelector("#orbitCanvas"));

  startSimulationButton.addEventListener("click", () => {
    system.drawSolarSystem();
  });
});
