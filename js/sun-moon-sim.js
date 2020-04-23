/**
 * All measurements are in SI base units.
 */

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
    velocity: {
      magnitude: 1022,
      direction: 90,
    },
  });

  return {
    ...system,
  };
})();
