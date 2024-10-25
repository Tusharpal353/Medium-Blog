import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign,verify } from "hono/jwt";

const app = new Hono();


app.use('/api/v1/blog/*',async (c,next)=>{
  //get the header
  //verify the header
  //if the header is correct, we need can proceed
  //if not return 403

  const header=c.req.header("authorization") || "";
  const tocken = header.split(" ")[1]
  
   //@ts-ignore
  const response = verify(tocken,c.env.JWT_SECRET)
  if(response.id){
    next()
  }else{
    c.status(403)
    return c.json({
      error:"unauthorized"
    })
  }
  await next()
})





app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,  
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // Create the user in the database
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    /*   name:body.name, */
    }
  });

  
  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ jwt: token });

});

app.post("/api/v1/signin",async  (c) => {

  //  1 initialized the prisma
  const prisma = new PrismaClient({
    //@ts-ignore 
    datasourceUrl: c.env.DATABASE_URL,  
  }).$extends(withAccelerate());

  // initialized body 
  const body= await c.req.json()
const user =await prisma.user.findUnique({
  where:{
    email:body.email,
    password:body.password
  }
})

if(!user){
  c.status(403)
  return c.json({
    error:"user not found "
  })
}

const jwt = await sign({id:user.id},c.env.JWT_SECRET)




  return c.json({jwt});
});
/* 
app.post("/api/v1/blog", (c) => {
  return c.text("this is the POST api/v1/signup route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("this is the POST api/v1/signup route");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("this is the POST api/v1/signup route");
});
 */
export default app;
