import { Request, Response } from "express";

// a custom error type for better type safety
interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response): void => {
  const status = err.status || 500; 
  const message = err.message || "Internal Server Error"; 
  res.status(status).json({ success: false, error: message });
};
