const { ErrorHttps, helpFunc } = require("../errors");
const { Contact } = require("../models/contacts");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  if (favorite) {
    filter.favorite = favorite;
  }
  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw ErrorHttps(404, "Not Found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw ErrorHttps(404, "Not Found");
  }
  res.json({ message: "Contact Deleted :)" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw ErrorHttps(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw ErrorHttps(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAll: helpFunc(getAll),
  getById: helpFunc(getById),
  add: helpFunc(add),
  deleteById: helpFunc(deleteById),
  updateById: helpFunc(updateById),
  updateStatusContact: helpFunc(updateStatusContact),
};
