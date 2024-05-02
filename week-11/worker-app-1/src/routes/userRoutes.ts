import { Hono } from "hono";
import { signup, signin } from "../controllers/userController";
import userMiddleware from "../middlewares/userMiddleware";

const user = new Hono();

user.use(userMiddleware);

user.post("/signup", signup);
user.post("/signin", signin);

export default user;
