

  import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { SignatureKey } from "hono/utils/jwt/jws";
import { Bindings } from "hono/types";
import { SigninInput, SignupInput } from "@tusharpal/medium";
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
  const prisma = new PrismaClient({
    datasourceUrl: c.env .DATABASE_URL,}).$extends(withAccelerate())
  const body = await c.req.json();
  const {success} = SignupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"inputs are not correct"
    })
  }

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
  const prisma = new PrismaClient({
    datasourceUrl: c.env .DATABASE_URL,}).$extends(withAccelerate())
  const body = await c.req.json();
  const {success} = SigninInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"inputs are not correct"
    })
  }
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
