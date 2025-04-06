import { Request, Response } from "express";
import { Types } from "mongoose";

export const validateId = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Bad Request", data: "Invalid ID format." });
  }
};
