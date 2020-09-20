const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const fs = require("fs").promise;
const contactsRouter = require("./api/contacts/router");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const runServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connection successful");

    const app = express();

    app.use(express.json());
    app.listen(PORT, () => console.log(`Server: ${PORT}`));
    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(morgan("dev"));

    app.use("/contacts", contactsRouter);

    app.use(async (err, req, res, next) => {
      if (err) {
        let logs = await fs.readFile("errors.logs.json", { encoding: "utf-8" });
        logs = JSON.parse(logs);
        logs.push({
          date: new Date().toISOString(),
          method: req.method,
          originalUrl: req.originalUrl,
          message: err.message,
        });
        logs = JSON.stringify(logs);
        await fs.writeFile("errors.logs.json", logs);
      }
      console.log("No error");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

runServer();
