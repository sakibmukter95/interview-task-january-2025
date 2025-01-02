import fs from "fs";
import path from "path";

export const loadDevices = () => {
  const devicesPath = path.resolve(__dirname, "../data/devices.json");
  const devices = JSON.parse(fs.readFileSync(devicesPath, "utf-8"));
  return devices;
};
