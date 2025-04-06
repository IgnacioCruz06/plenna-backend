import { Response } from "express";
import { log } from "./Log";

export class Controller {
  public static ok(res: Response, data?: any, metadata?: any) {
    const message = "Ok";
    if (Buffer.isBuffer(data)) data = data.toString();
    return res.status(200).json({ message, ...metadata, data });
  }

  public static created(res: Response, data?: any, metadata?: any) {
    const message = "Created";
    if (Buffer.isBuffer(data)) data = data.toString();
    return res.status(201).json({ message, ...metadata, data });
  }

  public static noContent(res: Response) {
    return res.status(204).end();
  }

  public static badRequest(res: Response, data?: any, metadata?: any) {
    const message = "Bad Request";
    if (Buffer.isBuffer(data)) data = data.toString();
    return res.status(400).json({ message, ...metadata, data });
  }

  public static notFound(res: Response, data?: any) {
    const message = "Not Found";
    log.error(data ?? message);

    if (Buffer.isBuffer(data)) data = data.toString();
    return res.status(404).send({ message });
  }

  public static serverError(res: Response, data?: any, metadata?: any) {
    const message = "Internal Server error";
    if (Buffer.isBuffer(data)) data = data.toString();
    return res.status(500).json({ message, ...metadata, data });
  }
}
