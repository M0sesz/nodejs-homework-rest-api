const { ErrorHttp } = require("../errors");

const validate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(ErrorHttp(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validate;
