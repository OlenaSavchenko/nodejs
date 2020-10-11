const { Router } = require("express");
const {
  registrationController,
  loginController,
  logoutController,
  checkVerificationToken,
} = require("./auth.controller");

const { registrationValidatorMiddleware } = require("./auth.validator");

const { checkAuthTokenMiddleware } = require("../middlewares/auth.middlewares");

const authRouter = Router();

authRouter.post(
  "/register",
  registrationValidatorMiddleware,
  registrationController
);
authRouter.post("/login", registrationValidatorMiddleware, loginController);

authRouter.post("/logout", checkAuthTokenMiddleware, logoutController);

authRouter.get("/verify/:verificationToken", checkVerificationToken);

module.exports = authRouter;
