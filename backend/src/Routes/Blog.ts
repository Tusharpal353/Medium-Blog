import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, UpdateBlogInput } from "@tusharpal/medium";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const BlogRouters = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string; // Assuming SignatureKey is a string
  };
  Variables: {
    userId: any; // Define userId as a string
   // Variables: { userId: string } sumana
  };
}>();



  BlogRouters.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    
    try {
      // Try to verify the token
      const user = await verify(authHeader, c.env.JWT_SECRET);
      
      if (user && typeof user.id === "string") {
        // If verification is successful, set userId in context
        c.set("userId", user.id);
        await next(); // Proceed to the next middleware or route handler
      } else {
        // If user is not valid or missing, return a 403 response
        return c.json(
          { message: "You are not logged in" },
          403
        );
      }
    } catch (error) {
      // Handle errors, such as invalid token or other issues during verification
      return c.json(
        { message: "Authentication failed", error },
        403
      );
    }
  });
  



BlogRouters.post("/", async (c) => {
  const body = await c.req.json();
 /*  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    return c.json({
      message: "inputs are not valid",
    });
  } */

  const authorId = c.get("userId");
 console.log("Author ID:", authorId);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },include: {
      author: true, // Include the author relation in the response
    },

  });

  return c.json({
    id: blog.id,
    author:blog.author
  });
});



BlogRouters.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = UpdateBlogInput.safeParse(body);
  if (!success) {
    return c.json({
      message: "inputs are not valid",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

BlogRouters.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blog,
  });
});

BlogRouters.get("/:id", async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true   
          }
        }
      }
    });

    return c.json({
      blog,
    });
  } catch (e) {
    return c.json({
      message: "error while fetching blog",
    });
  }
});
