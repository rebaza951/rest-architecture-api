const { createContainer, asClass, asValue, asFunction } = require("awilix");
const container = createContainer();
const app = require(".");

// config
const config = require("../config");

//services
const { HomeService } = require("../services");

// controllers
const { HomeController } = require("../controllers");

// routes
const { HomeRoutes } = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { Comment, User, Idea } = require("../models");

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
  })
  .register({
    Idea: asValue(Idea),
    User: asValue(User),
    Comment: asValue(Comment),
  });

module.exports = container;
