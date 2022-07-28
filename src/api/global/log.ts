import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {service: "user-service"},
  transports: [
    new winston.transports.File({filename: "log/error.log", level: "error"}),
    new winston.transports.File({filename: "log/combined.log"}),
  ],
});

if (process.env.NODE_ENV !== "prod") {
  logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
  );
}

export {logger};
