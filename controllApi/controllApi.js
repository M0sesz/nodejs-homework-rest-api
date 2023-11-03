const { ErrorHttp, helpFunc } = require("../errors");
const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw ErrorHttp(404, "Not Found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw ErrorHttp(404, "Not Found");
  }
  res.json({
    message: "Contact Deleted",
  });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw ErrorHttp(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAll: helpFunc(getAll),
  getById: helpFunc(getById),
  add: helpFunc(add),
  deleteById: helpFunc(deleteById),
  updateById: helpFunc(updateById),
};
