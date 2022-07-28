import http from "http";
import express, {ErrorRequestHandler, Express} from "express";
import morgan from "morgan";
import routes from "./route/roleRoute";

import {logger} from "./global/log";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("json spaces", 2);

app.use("/", routes);

app.use((req, res) => {
  logger.log("error", `Not Found: \'${req.url}\'.`);

  return res.status(404).json({
    code: "NOT_FOUND",
    message: "Not found.",
  });
});

app.use(((err, req, res, next) => {
  logger.log("error", "Internal error", err);

  return res.status(500).json({
    code: "INTERNAL_ERROR",
    message: err.message,
  });
}) as ErrorRequestHandler);

const server = http.createServer(app);

const PORT: any = process.env.PORT ?? 6060;

server.listen(PORT, () =>
    logger.log("info", `The server is running on port ${PORT}.`)
);

server.on("close", () => {
  logger.log("info", "The server is closing.");
});
