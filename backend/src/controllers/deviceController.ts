import { Request, Response, NextFunction } from "express";
import { loadDevices } from "../services/deviceLoader";

export const getAllDevices = (req: Request, res: Response, next: NextFunction) => {
  try {
    const devices = loadDevices();
    res.status(200).json({ success: true, data: devices });
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};
