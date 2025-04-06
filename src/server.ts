import express from "express";
import morgan from "morgan";
import { config } from "./config";
import { log, requestLogStream } from "./libraries/Log";
import { requestLogger } from "./middlewares/resquestLogger";
import router from "./routes/Paciente";
import { validateEmptyPostBody } from "./middlewares/emptyBody";
import http from "http"

const app = express();
const server = http.createServer(app)

const PORT = config.server.port || 8000;

//Middleware to parse incoming requests with urlencoded payloads and is based on body-parser.
//extended property allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
app.use(express.urlencoded({ extended: true }));

//Body parser middleware
app.use(express.json());

// Use morgan to log requests to the console
app.use(morgan("short", { stream: requestLogStream }));

// TODO: Add cors config

//Global middlewares
app.use(requestLogger);
app.use(validateEmptyPostBody);

//routes
//routes(app);
app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.send("Welcome to this new server :)");
});

/* app.listen(PORT, () => {
  console.log(`--Server started at port ${PORT}`);
  log.info(`Server started at port ${PORT}`);
}); */

export function setupServer(): Promise<void> {
  return new Promise((resolve, _reject) => {
    server.listen(PORT, () => {
      log.info(`Server started at port ${PORT}`);
      resolve();
    });
  });
}
