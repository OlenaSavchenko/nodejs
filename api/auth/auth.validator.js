const Joi = require("joi");

const RegistrationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.email") {
          err.message = "Ошибка от Joi или другой валидационной библиотеки";
        }
      });
      return errors;
    }),

  subscription: Joi.string().error((errors) => {
    console.log(errors);
    return errors;
  }),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,16}$/)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message = "Ошибка от Joi или другой валидационной библиотеки";
        }
      });
      return errors;
    }),
});

const validationMiddleware = (schema) => async (req, res, next) => {
  const { error } = await schema.validate(req.body);
  if (error) {
    const message = error.details.reduce((msg, nextErr) => {
      if (msg) {
        return msg + ", " + nextErr.message;
      }
      return nextErr.message;
    }, "");
    res.status(400).send(message);
    return;
  }
  next();
};

module.exports = {
  registrationValidatorMiddleware: validationMiddleware(RegistrationSchema),
};
