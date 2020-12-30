import mongoose from "mongoose";
import logger from "../shared/logger";

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) logger.imp("Connected to Mongo db ");
    else logger.err(err);
  }
);
