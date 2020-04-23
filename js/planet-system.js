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

  const tick = function (numberOfSeconds) {
    return planets.map(p => ({
      ...p
    }));
  };

  return {
    addPlanet,
    tick,
    state: function () {
      return { center, planets };
    },
  };
})();
