const { Router } = require("express");
const {
  getCurrentUserController,
  updateUserSubscriptionController,
} = require("./users.controler");

const { checkAuthTokenMiddleware } = require("../middlewares/auth.middlewares");

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);
usersRouter.patch(
  "/",
  checkAuthTokenMiddleware,
  updateUserSubscriptionController
);

module.exports = usersRouter;
