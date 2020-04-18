const fs = require("fs");

fs.watch("./js", () => {
  const bundled = fs.readdirSync("./js").map((script) => {
    return fs.readFileSync(`./js/${script}`);
  });

  fs.writeFileSync(`./build/scripts.js`, bundled.join("\n"));
  console.log("updating teh bundlez");
});
