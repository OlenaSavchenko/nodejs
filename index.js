const contactsRouter = require("./api/contacts/router");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

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
    console.log('No error')
  });
  
  
