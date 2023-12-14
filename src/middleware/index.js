const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const cors = require("cors");
const swaggerDoc = YAML.load("./swagger.yaml");
// const authenticate = require('./authenticate');

const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(morgan("dev"));
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: "./swagger.yaml",
    })
  );
  app.use((req, res, next) => {
    req.user = { id: "6568c4210a26245b8cb27313" };
    next();
  });
};

module.exports = applyMiddleware;
