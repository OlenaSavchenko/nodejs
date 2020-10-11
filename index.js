const dotenv = require("dotenv");
dotenv.config();
const { PORT, HOST } = require("./config");

const express = require("express");
const fs = require("fs").promise;
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const contactsRouter = require("./api/contacts/router");
const authRouter = require("./api/auth/auth.router");
const usersRouter = require("./api/users/users.router");

const runServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("Database connection successful");

    const app = express();
    app.use(express.static(path.resolve(__dirname, "public")));
    app.use(express.json());
    app.listen(PORT, () => console.log(`Server: ${PORT}`));
    app.use(cors({ origin: `${HOST}${PORT}` }));
    app.use(morgan("dev"));

    app.use("/auth", authRouter);

    app.use("/contacts", contactsRouter);

    app.use("/users", usersRouter);
  } catch (error) {
    console.log("Error message:", error.message);
    process.exit(1);
  }
};

runServer();
