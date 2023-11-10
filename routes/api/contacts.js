const express = require("express");

const func = require("../../controllApi/controllApi");

const mongoError = require("../../errors/handleMongoError");

const { validate, idValidate } = require("../../middlewares");

const { newSchema, updateSchema } = require("../../models/contacts");

const router = express.Router();

router.get("/", func.getAll);

router.get("/:contactId", idValidate, func.getById);

router.post("/", mongoError, func.add);

router.delete("/:contactId", idValidate, func.deleteById);

router.put("/:contactId", idValidate, validate(newSchema), func.updateById);

router.patch(
  "/:contactId/favorite",
  idValidate,
  validate(updateSchema),
  func.updateStatusContact
);

module.exports = router;
