import express, { Request, Response } from "express";
import cors from "cors";
import deviceRoutes from "./routes/deviceRoutes";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const port = 8000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

//Routes
app.use("/api/devices", deviceRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[backend]: Server is running at port: ${port}`);
});
