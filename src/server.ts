import express from "express"; 
import path from "path";
import { healthRouter } from "./routes/health";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);

app.use(express.static(path.join(__dirname, "../frontend")));


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

