const fs = require("node:fs/promises");
const path = require("node:path");
const jimp = require("jimp");

const { User } = require("../models/user");

const uploadAvatar = async (req, res, next) => {
  try {
    const image = await jimp.read(req.file.path);

    await image.resize(250, 250);

    await image.writeAsync(req.file.path);

    await fs.rename(
      req.file.path,
      path.join(__dirname, "../public/avatars", req.file.filename)
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    ).exec();

    res.send({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadAvatar };
