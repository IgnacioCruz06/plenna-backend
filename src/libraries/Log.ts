import { config } from "../config";
import { createLogger, format, transports } from "winston";
import path from "path";

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  }),
  format.splat(),
  //format.json()
);

// Logging debug and above
export const log = createLogger({
  level: config.log.level,
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join("./src/logs", "plenna-back-logs.log"),
    }),
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});

// Logging requests and general logs
export const requestLog = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join("./src/logs", "plenna-back-requests.log"),
    }),
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});

export const requestLogStream: any = {
  write: function (message) {
    log.info(message.trim());
  },
};