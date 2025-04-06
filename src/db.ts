import mongoose from "mongoose";
import { config } from "./config";
import { log } from "./libraries/Log";

const connectUrl = config.db.connection_string;

export const setupDB = async () => {
  try {
    await mongoose.connect(connectUrl, { retryWrites: true, w: "majority" });
    log.info("Database connected successfully.");
  } catch (error) {
    log.error("Error trying to connect to the database.");
    log.error(error);
  }
};
