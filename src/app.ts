import express from "express"

import dotenv from "dotenv";
dotenv.config();

// import cors from "cors"
import routes from "./routes"

const app = express()

const PORT: string | number = process.env.PORT || 4000

// app.use(cors())
app.use("/api", routes)

app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
