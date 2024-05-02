import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { showRoutes } from "hono/dev";

import postRouter from "./routes/postRoutes";
import userRouter from "./routes/userRoutes";

const app = new Hono();

app.use(logger());
app.use(cors());
app.use(prettyJSON());

app.route("/users", userRouter);
app.route("/posts", postRouter);

showRoutes(app);

export default app;
