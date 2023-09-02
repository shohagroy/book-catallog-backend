import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("book catallog backend server is running...");
});

app.all("*", (req: Request, res: Response) => {
  res.status(500).send("No Route Found");
});

export default app;
