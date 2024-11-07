import { Router } from "express";
import { usersListGet, usersCreateGet, usersDeletePost, usersCreatePost, usersUpdateGet, usersUpdatePost }  from "../controllers/userController.js"

const usersRouter = Router();

usersRouter.get("/", usersListGet);
usersRouter.get("/create", usersCreateGet);
usersRouter.get("/:id/update", usersUpdateGet);
usersRouter.post("/create", usersCreatePost);
usersRouter.post("/:id/update", usersUpdatePost);
usersRouter.post("/:id/delete", usersDeletePost);

export default usersRouter;
