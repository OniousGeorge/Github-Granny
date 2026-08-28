import app from "./app";
import express from "express"; 
import path from "path";

app.use(express.static(path.join(__dirname, "../frontend")));


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});