window.addEventListener("load", function () {
  const createPlanetForm = document.querySelector("#createPlanetForm");
  const createPlanetButton = document.querySelector("#createPlanetButton");

  createPlanetForm.addEventListener("input", function () {
    form
      .get(createPlanetForm)
      .disable(createPlanetButton).if.requiredFieldsNotPopulated;
  });

  createPlanetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formValues = createPlanetForm.elements;

    const planet = {
      name: formValues["planetName"].value,
      radius: formValues["planetRadius"].value,
      mass: formValues["planetMass"].value,
    };

    planetSystem.addPlanet(planet);
    console.log(planetSystem.planets());
  });
});

const form = (() => {
  const get = function (form) {
    const disable = function (element) {
      return {
        if: {
          requiredFieldsNotPopulated: (function () {
            const inputs = form.elements;

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
            element.disabled = inputsFilled !== inputsRequired;
          })(),
        },
      };
    };
    return {
      disable,
    };
  };

  return {
    get,
  };
})();

const planetSystem = (() => {
  const _planets = [];

  const addPlanet = function (planet) {
    _planets.push(planet);
  };

  const planets = function () {
    return _planets;
  };

  return {
    addPlanet,
    planets,
  };
})();
