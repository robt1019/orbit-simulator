const planetSystem = function (canvas) {
  canvas = canvas2D(canvas);
  const fitCanvasToScreen = function (canvas) {
    canvas.height = window.innerHeight * 0.9;
    canvas.width = window.innerWidth * 0.99;
  };

  fitCanvasToScreen(canvas);

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
