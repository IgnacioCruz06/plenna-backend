import express from "express";
import morgan from "morgan";
import { config } from "./config";
import { log, requestLogStream } from "./libraries/Log";
import { requestLogger } from "./middlewares/resquestLogger";
import { routes } from "./routes";

const app = express();

const PORT = config.server.port || 8000;

//Middleware to parse incoming requests with urlencoded payloads and is based on body-parser.
//extended property allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
app.use(express.urlencoded({ extended: true }));

//Body parser middleware
app.use(express.json());

// Use morgan to log requests to the console
app.use(morgan("short", { stream: requestLogStream }));

//Global middlewares
app.use(requestLogger);
//app.use(checkEmptyPostBody);

//routes
routes(app);
//app.use("/api/v1/")

app.get("/", (_req, res) => {
  res.send("Welcome to this new server :)");
});

app.listen(PORT, () => {
  console.log(`--Server started at port ${PORT}`);
  log.info(`Server started at port ${PORT}`);
});
