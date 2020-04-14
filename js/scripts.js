window.addEventListener("load", function () {
  const createPlanetForm = document.querySelector("#createPlanetForm");

  createPlanetForm.addEventListener("input", function () {
    const inputs = createPlanetForm.elements;

    let inputsFilled = 0;
    let inputsRequired = 0;

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].required) {
        inputsRequired += 1;
        if (inputs[i].value) {
          inputsFilled += 1;
        }
      }
    }

    if (inputsFilled === inputsRequired) {
      document.querySelector("#createPlanetButton").disabled = false;
    } else {
      document.querySelector("#createPlanetButton").disabled = true;
    }
  });

  createPlanetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formValues = createPlanetForm.elements;

    console.log({
      name: formValues["planetName"].value,
      radius: formValues["planetRadius"].value,
      mass: formValues["planetMass"].value,
    });
  });
});

const orbits = (() => {
  const planets = [];

  const addPlanet = function (planet) {
    planets.push(planet);
  };

  const tick = function () {
    return planets;
  };

  return {
    addPlanet,
    tick,
  };
})();
