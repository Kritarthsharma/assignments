import { z } from "zod";

const signUpSchema = z.object({
  userName: z
    .string()
    .min(3, "userName is required. Length should be greater than 2 characters"),
  firstName: z
    .string()
    .min(2, "firstName is required. Length should be greater than 1 character"),
  lastName: z
    .string()
    .min(2, "lastName length should be greater than 1 character")
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(6, "password is required. Length should be greater than 5 characters"),
});

const signInSchema = z.object({
  userName: z
    .string()
    .min(3, "userName is required. Length should be greater than 2 characters"),
  password: z
    .string()
    .min(6, "password is required. Length should be greater than 5 characters"),
});

const userMiddleware = async (c: any, next: any) => {
  try {
    const body = await c.req.json();
    const { success, error } =
      c.req.path === "/users/signup"
        ? signUpSchema.safeParse(body)
        : signInSchema.safeParse(body);

    if (!success) return c.text(error, 422);
    await next();
  } catch (err) {
    console.log(`User Middleware: ${err}`);
    c.text("Something went wrong!", 500);
  }
};

export default userMiddleware;
