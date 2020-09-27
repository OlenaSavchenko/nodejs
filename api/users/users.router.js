const { Router } = require("express");
const { getCurrentUserController } = require("./users.controler");

const { checkAuthTokenMiddleware } = require("../middlewares/auth.middlewares");

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);

module.exports = usersRouter;
