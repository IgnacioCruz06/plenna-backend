import { Request, Response, NextFunction } from "express";

export const validateEmptyPostBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method !== "POST") {
    next();
    return;
  }

  if (!req?.body || Object.keys(req?.body).length === 0) {
    res.status(400).json({ message: "Bad Request", data: "Empty body." });
    return;
  }

  next();
};
