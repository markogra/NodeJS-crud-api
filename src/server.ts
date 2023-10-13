import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import cors from "cors";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  console.log("Hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "Sorry, that's on us" });
  }
});

// Handling errors in Node(nothing to do with express)
// process.on("uncaughtException", () => {});
// process.on("unhandledRejection", () => {});

export default app;
