import { Hono } from "hono";
//import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { Bindings } from "hono/types";
import { SignatureKey } from "hono/utils/jwt/jws";
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
          /*  name: body.name, */
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
  
