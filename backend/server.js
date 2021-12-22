const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db");
const { BasicInfo, Inflation } = require("./schemas");
// const { router: authRouter, autoLogin } = require("./routes/auth");
// const orderRouter = require("./routes/order");
// const dataRouter = require("./routes/data");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.text());
app.use(morgan("tiny"));
app.use(cors());

connectDB();

app.get("/api/v1/info", async (req, res, next) => {
  try {
    const infos = await BasicInfo.find();
    res.json(infos);
  } catch (err) {
    next(err);
  }
});
app.get("/api/v1/inflation", async (req, res, next) => {
  try {
    const inflation = await Inflation.find();
    res.json(inflation);
  } catch (err) {
    next(err);
  }
});

// Error Handler
notFound = (req, res, next) => {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
};

errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    error: err.name,
    message: err.message,
  });
};

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, async function () {
  console.log("Server is running");
});

module.exports = app;
