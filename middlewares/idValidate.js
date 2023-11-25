const { isValidObjectId } = require("mongoose");

const { ErrorHttps } = require("../errors");

const idValidate = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(ErrorHttps(400, `${contactId} not valid id!`));
  }
  next();
};

module.exports = idValidate;
