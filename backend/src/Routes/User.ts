/* import { Hono } from "hono";
//import { PrismaClient } from '@prisma/client'

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { Bindings } from "hono/types";
import { SignatureKey } from "hono/utils/jwt/jws";
const prisma = new PrismaClient()
export const userRouter = new Hono<{
Bindings: {
    DATABASE_URL: String;
    JWT_SECRET: SignatureKey;
    id: string;
  };}
>();

//SIGNUP ROUTE
userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          //  name: body.name,
        },
      });
      const tocken = await sign(
        {
          id: user.id,
        },
        c.env.JWT_SECRET
      );
      return c.text(tocken);
      // return c.text("signed up")
    } catch (error) {
      c.status(411);
      return c.text("User already exists");
    }
  });
  
  //SIGNIN ROUTE
  userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password,
        },
      });
      if (!user) {
        return c.json({ message: "user does not exists " });
      }
  
      const tocken = await sign(
        {
          id: user.id,
        },
        c.env.JWT_SECRET
      );
      return c.text(tocken);
      
    } catch (error) {
      c.status(411);
      return c.text("User already exists");
    }
  });
  
 */

  import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { SignatureKey } from "hono/utils/jwt/jws";
import { Bindings } from "hono/types";

// Prisma Client Singleton with Accelerate
const prisma = new PrismaClient().$extends(withAccelerate());

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: SignatureKey;
    id: string;
  };
}>();

// SIGNUP ROUTE
userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  try {
    // Create user in the database
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    // Sign JWT with user ID
    const token = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(token); // Return token
  } catch (error) {
    console.error("Error in signup:", error);
    c.status(400); // Change to appropriate status code for bad request
    return c.text("User already exists or error occurred");
  }
});

// SIGNIN ROUTE
userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  try {
    // Find user in the database
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    // Handle invalid credentials
    if (!user) {
      c.status(401);
      return c.json({ message: "Invalid credentials" });
    }

    // Sign JWT with user ID
    const token = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(token); // Return token
  } catch (error) {
    console.error("Error in signin:", error);
    c.status(500); // Internal server error
    return c.text("An error occurred");
  }
});
