const { createContainer, asClass, asValue, asFunction } = require("awilix");
const container = createContainer();
const app = require(".");

// config
const config = require("../config");

//services
const {
  HomeService,
  UserService,
  CommentService,
  IdeaService,
} = require("../services");

// controllers
const {
  HomeController,
  UserController,
  IdeaController,
  CommentController,
} = require("../controllers");

// routes
const { HomeRoutes } = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { Comment, User, Idea } = require("../models");

// Repositories
const {
  UserRepository,
  IdeaRepository,
  CommentRepository,
} = require("../repositories");

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(
      CommentController.bind(CommentController)
    ).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
  })
  .register({
    Idea: asValue(Idea),
    User: asValue(User),
    Comment: asValue(Comment),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
  });

module.exports = container;
