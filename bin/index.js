#!/usr/bin/env node

function loadModule() {
  const command = process.argv[2];

  if (command === "component") {
    require("./generatorComponent");
  } else if (command === "type") {
    require("./generatorType");
  } else {
    console.log("Enter the following command → $ md-cli type");
    console.log("Enter the following command → $ md-cli component");
  }
}

loadModule();
