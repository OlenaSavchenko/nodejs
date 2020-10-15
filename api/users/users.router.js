const { Router } = require("express");
const {
  getCurrentUserController,
  updateUserSubscriptionController,
  updateAvatarController,
} = require("./users.controler");

const {
  avatarUploaderMiddleware,
} = require("../middlewares/fileUploader.middleware");

const { checkAuthTokenMiddleware } = require("../middlewares/auth.middlewares");

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);
usersRouter.patch(
  "/",
  checkAuthTokenMiddleware,
  updateUserSubscriptionController
);

usersRouter.patch(
  "/avatars",
  checkAuthTokenMiddleware,
  avatarUploaderMiddleware,
  updateAvatarController
);

module.exports = usersRouter;
