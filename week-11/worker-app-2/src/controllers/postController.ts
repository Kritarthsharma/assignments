import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getPosts = async (c: any): Promise<any> => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const result = await prisma.post.findMany({
      where: { userId: c.req.userId },
      include: {
        user: c.req.userId
          ? { select: { userName: true, firstName: true } }
          : false,
        tags: { select: { id: false, name: true } },
      },
    });

    return c.json(
      {
        posts: result,
      },
      200
    );
  } catch (error) {
    console.log(`Get Posts(postController): ${error}`);
    return c.text("Error getting posts", 500);
  }
};

export const getPost = async (c: any): Promise<any> => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = parseInt(c.req.param("id"));

    const result = await prisma.post.findUnique({
      where: { id },
      include: {
        user: c.req.userId
          ? { select: { userName: true, firstName: true } }
          : false,
        tags: { select: { id: false, name: true } },
      },
    });

    return c.json(
      {
        post: result,
      },
      200
    );
  } catch (error) {
    console.log(`Get Post(postController): ${error}`);
    return c.text("Error getting post", 500);
  }
};

export const createPost = async (c: any): Promise<void> => {
  try {
    const body: { [key: string]: any } = await c.req.json();
    const postData: any = {
      userId: c.req.userId,
      title: body.title,
      body: body.body,
      tags: {
        create: body.tags.map((tag: string) => ({ name: tag })),
      },
    };

    const prisma: any = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const result = await prisma.post.create({
      data: postData,
    });

    return c.json({
      result,
    });
  } catch (error) {
    console.log(`Create Post(postController): ${error}`);
    return c.text("Error creating post", 500);
  }
};

export const updatePost = async (c: any): Promise<void> => {
  try {
    const body: { [key: string]: any } = await c.req.json();
    const postData: any = {
      title: body.title,
      body: body.body,
      tags: {
        create: body.tags.map((tag: string) => ({ name: tag })),
      },
    };

    const prisma: any = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = parseInt(c.req.param("id"));

    const result = await prisma.post.update({
      where: { id },
      data: postData,
    });

    return c.json({
      result,
    });
  } catch (error) {
    console.log(`Update Post(postController): ${error}`);
    return c.text("Error updating post", 500);
  }
};

export const deletePost = async (c: any): Promise<void> => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = parseInt(c.req.param("id"));

    const result = await prisma.post.delete({
      where: { id },
    });

    return c.json({
      result,
    });
  } catch (error) {
    console.log(`Delete Post(postController): ${error}`);
    return c.text("Error deleting post", 500);
  }
};
