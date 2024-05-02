import { z } from "zod";

const validTags = [
  "technology",
  "health",
  "science",
  "education",
  "nature",
  "sports",
  "travel",
  "food",
  "music",
  "fashion",
] as const;

const postSchema = z.object({
  title: z
    .string()
    .min(3, "title is required. Length should be greater than 2 characters"),
  body: z
    .string()
    .min(10, "body is required. Length should be greater than 9 characters"),
  tags: z
    .array(z.enum(validTags))
    .nonempty(`At least one tag is required from these tags: ${validTags}`),
});

const postMiddleware = async (c: any, next: any) => {
  try {
    const body = await c.req.json();
    const { success, error } = postSchema.safeParse(body);

    if (!success) return c.text(error.errors[0].message, 422);
    await next();
  } catch (err) {
    console.log(`Post Middleware: ${err}`);
    return c.text("Something went wrong", 500);
  }
};

export default postMiddleware;
