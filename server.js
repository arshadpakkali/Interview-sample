import morgan from "morgan";
import StatusCodes from "http-status-codes";
import express from "express";

import "express-async-errors";

import BaseRouter from "./routes";
import logger from "./shared/logger";

const app = express();
const { BAD_REQUEST } = StatusCodes;

/** **********************************************************************************
 *                              Set basic express settings
 ********************************************************************************** */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Add APIs
app.use("/", BaseRouter);

// Print API errors
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

/** **********************************************************************************
 *                              Export Server
 ********************************************************************************** */

export default app;
