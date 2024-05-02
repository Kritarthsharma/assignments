import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

const authMiddleware = async (c: any, next: any) => {
  let token;
  if (
    c.req.header("Authorization") &&
    c.req.header("Authorization").startsWith("Bearer")
  )
    token = c.req.header("Authorization").split(" ")[1];
  else if (getCookie(c, "jwt")) token = getCookie(c, "jwt");

  const { id } = c.req.param();
  if (
    !token &&
    (c.req.path === `/posts/${id}` || c.req.path === "/posts") &&
    c.req.method === "GET"
  )
    await next();
  else if (!token) {
    return c.text("Not Authorized!", 401);
  }

  try {
    const decoded = await verify(token, c.env.JWT_SECRET);
    c.req.userId = decoded.userId;
    await next();
  } catch (error) {
    console.log(`Auth Middleware: ${error}`);
    return c.text("Token provided is Incorrect!", 403);
  }
};

export default authMiddleware;
