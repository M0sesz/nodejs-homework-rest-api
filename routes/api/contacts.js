const express = require("express");

const func = require("../../controllApi/controllApi");

const { validate } = require("../../middlewares");

const schemas = require("../../validation/contactsJoi");

const router = express.Router();

router.get("/", func.getAll);
router.get("/:contactId", func.getById);
router.post("/", validate(schemas.addSchema), func.add);
router.delete("/:contactId", func.deleteById);
router.put("/:contactId", validate(schemas.addSchema), func.updateById);

module.exports = router;
