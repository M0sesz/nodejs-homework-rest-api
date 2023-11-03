const helpFunc = (help) => {
  const helper = async (req, res, next) => {
    try {
      await help(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return helper;
};

module.exports = helpFunc;
