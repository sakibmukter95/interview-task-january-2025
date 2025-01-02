import { Request, Response } from "express";
import { loadDevices } from "../services/dataLoader";

export const getAllDevices = (req: Request, res: Response) => {
  const devices = loadDevices();
  res.status(200).json({ success: true, data: devices });
};