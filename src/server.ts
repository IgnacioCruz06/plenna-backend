import express from "express";
import morgan from "morgan";
import { config } from "./config";
import { log, requestLogStream } from "./libraries/Log";
import { requestLogger } from "./middlewares/resquestLogger";
import router from "./routes/Paciente";
import mongoose from "mongoose";

const app = express();

const connectUrl = `mongodb+srv://${config.db.username}:${config.db.password}@plenna-back-ignacio.lxdew55.mongodb.net/?appName=${config.db.dbName}`;
//`mongodb+srv://${config.db.username}:${config.db.password}@plenna-back-ignacio.lxdew55.mongodb.net/?retryWrites=true&w=majority&appName=plenna-back-ignacio`

mongoose
  .connect(connectUrl, { retryWrites: true, w: "majority" })
  .then(() => {
    log.info("Database connected successfully.");
  })
  .catch((error) => {
    log.error("Error trying to connect to the database.");
    log.error(error);
  });

const PORT = config.server.port || 8000;

//Middleware to parse incoming requests with urlencoded payloads and is based on body-parser.
//extended property allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
app.use(express.urlencoded({ extended: true }));

//Body parser middleware
app.use(express.json());

// Use morgan to log requests to the console
app.use(morgan("short", { stream: requestLogStream }));

// Healthcheck
app.get("/ping", (_req, res, _next) => {
  res.status(200).json({ message: "pong" });
});

// TODO: Add cors config

//Global middlewares
app.use(requestLogger);
//app.use(checkEmptyPostBody);

//routes
//routes(app);
app.use("/api/v1", router)

app.get("/", (_req, res) => {
  res.send("Welcome to this new server :)");
});

app.listen(PORT, () => {
  console.log(`--Server started at port ${PORT}`);
  log.info(`Server started at port ${PORT}`);
});
