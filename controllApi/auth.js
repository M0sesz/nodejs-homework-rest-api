const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ error: "Email already in use" });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(409).json({ error: "Email or password invalid" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(401).json({ error: "Email or password invalid" });
  }

  const payload = {
    id: user._id,
    name: user.name,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1w" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({
    message: "Logout success",
  });
};

const current = (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

module.exports = {
  register,
  login,
  logout,
  current,
};
