import express from "express"; 
import path from "path";
import { healthRouter } from "./routes/health";
import { githubRepoRouter } from "./routes/githubRepo";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";


const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/health", healthRouter);
app.use("/repos", githubRepoRouter);
app.use(errorHandler);

export default app;