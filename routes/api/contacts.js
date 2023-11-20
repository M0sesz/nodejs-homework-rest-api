const express = require("express");

const func = require("../../controllApi/controllApi");

const { validate, idValidate, auth } = require("../../middlewares");

const { newSchema, updateSchema } = require("../../models/contacts");

const router = express.Router();

router.get("/", auth, func.getAll);

router.get("/:contactId", idValidate, auth, func.getById);

router.post("/", auth, func.add);

router.delete("/:contactId", auth, idValidate, func.deleteById);

router.put(
  "/:contactId",
  auth,
  idValidate,
  validate(newSchema),
  func.updateById
);

router.patch(
  "/:contactId/favorite",
  idValidate,
  auth,
  validate(updateSchema),
  func.updateStatusContact
);

module.exports = router;
