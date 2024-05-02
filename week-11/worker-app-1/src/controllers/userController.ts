import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";

const excludeFromObject = <T, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj as Record<string, any>).filter(
      ([key]) => !keys.includes(key as K)
    )
  ) as Omit<T, K>;
};

export const signin = async (c: any): Promise<any> => {
  try {
    const { userName, password } = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    let result = await prisma.user.findUnique({
      where: { userName },
    });

    if (!result) return c.text("User not found with the given username!", 401);

    if (result.password != password)
      return c.text("Password is incorrect!", 401);

    const resultWithoutPassword = excludeFromObject(result, ["password"]);
    result = null;

    const token = await sign(
      { userId: resultWithoutPassword.id },
      c.env.JWT_SECRET
    );

    setCookie(c, "jwt", token, { httpOnly: true });

    return c.json(
      {
        user: resultWithoutPassword,
        token,
      },
      200
    );
  } catch (error) {
    console.log(`SignIn(userController): ${error}`);
    return c.text("Error getting user", 500);
  }
};

export const signup = async (c: any): Promise<any> => {
  try {
    const body: { [key: string]: any } = await c.req.json();
    const userData: any = {
      userName: body.userName,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
    };

    const prisma: any = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    let result = await prisma.user.create({
      data: userData,
    });

    if (!result) return c.text("Failed to create user. Try Again!", 401);

    const resultWithoutPassword = excludeFromObject(result, ["password"]);
    result = null;

    const token = await sign(
      { userId: resultWithoutPassword.id },
      c.env.JWT_SECRET
    );

    setCookie(c, "jwt", token, { httpOnly: true });

    return c.json(
      {
        user: resultWithoutPassword,
        token,
      },
      200
    );
  } catch (error) {
    console.log(`SignUp(userController): ${error}`);
    return c.text("Error creating user", 500);
  }
};
