import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import usersRouter from "./routes/usersRouter.js";

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.set("view engine", "ejs")
app.use(urlencoded({ extended: true }))
app.use("/", usersRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on http://localhost:${PORT}`))
