const express = require("express");
const path = require("path");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const cors = require("cors");
const swaggerDoc = YAML.load(path.resolve("./swagger.yaml"));
// const cookieParser = require("cookie-parser");
// const authenticate = require('./authenticate');
const cookieObj = (cookie = "") =>
  cookie?.split?.(/; /g)?.reduce?.((a, c) => {
    const [k, v] = c.split("=");
    if (k && v) a[k.trim()] = v.trim();
    return a;
  }, {});
const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: [
        "http://localhost:4001",
        "http://localhost:4003",
        "http://localhost:3000",
        "https://pz-attendance.netlify.app",
      ],
      credentials: true,
    })
  );
  app.use(morgan("dev"));
  // app.use(cookieParser())
  app.use((req, res, next) => {
    const { cookie } = req.headers;
    if (cookie) {
      const cookies = cookieObj(decodeURIComponent(cookie));

      req.cookies = cookies;
    }
    return next();
  });
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
