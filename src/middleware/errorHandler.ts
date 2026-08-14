import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../utils";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(res.headersSent) {
    next(err);
    return;
  }

  res.status(500).json({ error: { message: getErrorMessage(err) } });
  next(err);    
};
