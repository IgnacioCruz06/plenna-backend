import { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ message: "Bad Request", data: error.details });
      return;
    }

    req.body = value;
    next();
  };
};
