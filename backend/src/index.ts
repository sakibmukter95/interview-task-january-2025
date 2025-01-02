import express, { Request, Response } from "express";
import cors from "cors";
import deviceRoutes from "./routes/deviceRoutes";

const app = express();
const port = 8000;

app.use(cors());

app.use("/api/devices", deviceRoutes);

app.listen(port, () => {
  console.log(`[backend]: Server is running at port: ${port}`);
});
