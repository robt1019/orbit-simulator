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