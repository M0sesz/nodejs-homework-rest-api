const mongoose = require("mongoose");

const app = require("./app");

const DB_URI = process.env["DB_URI"];

mongoose.set("strictQuery", true);

async function run() {
  try {
    await mongoose.connect(DB_URI);
    app.listen(3000);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

run()
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.error(error.message));
