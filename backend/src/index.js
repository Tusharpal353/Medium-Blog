import { Hono } from "hono";
import { userRouter } from './Routes/User';
import { BlogRouters } from "./Routes/Blog";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = new Hono();
//HOME ROUTE
app.get("/", (c) => {
    return c.text("Hello Hono main route!");
});
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', BlogRouters);
export default app;
