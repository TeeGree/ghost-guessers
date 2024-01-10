import express from "express";
import service from "./api";
import cors from "cors";

const app = express();

app.use(cors()); // enable CORS
app.use("/", express.static("dist")); // file server for the frontend
app.use("/api", service); // REST APIs

app.listen(3002, () => console.log("Server started!"));
