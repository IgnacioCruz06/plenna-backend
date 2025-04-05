import dotenv from 'dotenv';
dotenv.config();

export const config = {
  server: {
    port: process.env.SERVER_PORT || 3001,
  },
  log: {
    level: process.env.LOG_LEVEL || "debug",
    logToFiles: process.env.LOG_TO_FILES
      ? process.env.LOG_TO_FLES === "true"
      : false,
  },
};
