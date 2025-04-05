import { Application } from "express";
import { log } from "./libraries/Log";

const importedControllersV1 = require("require-dir-all")("controllers/v1");
const controllersV1 = Object.keys(importedControllersV1).map(
  (k) => importedControllersV1[k].default
);

export function routes(app: Application) {
  for (const controller of controllersV1) {
    if (controller.name == null || controller.name.length === 0) {
      log.error("Invalid controller name: ", controller.name, controller);
      continue;
    }
    app.use(`/api/v1/${controller.name}`, controller.routes());
  }
}
