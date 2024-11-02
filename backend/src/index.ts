import { Hono } from "hono";

import { SignatureKey } from "hono/utils/jwt/jws";
import { userRouter } from './Routes/User';
import { BlogRouters } from "./Routes/Blog";
import { PrismaClient } from '@prisma/client'
import {cors} from "hono/cors"

const prisma = new PrismaClient()
const app = new Hono<{
  Bindings: {
    DATABASE_URL: String;
    JWT_SECRET: SignatureKey;
    id: string;
  };
}>();

app.use("/*",cors())
//HOME ROUTE
app.get("/", (c) => {
  return c.text("Hello Hono main route!");
});
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',BlogRouters)

export default app;
