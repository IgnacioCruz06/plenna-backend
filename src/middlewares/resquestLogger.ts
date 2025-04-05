import { Request, Response, NextFunction } from "express";
import { requestLog } from "../libraries/Log";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  requestLog.info(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};
