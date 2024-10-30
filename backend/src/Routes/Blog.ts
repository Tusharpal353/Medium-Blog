import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, UpdateBlogInput } from "@tusharpal/medium";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { Bindings } from 'hono/types';


export const BlogRouters = new Hono<{
  Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string, // Assuming SignatureKey is a string
  },
  Variables: {
      userId: string; // Define userId as a string
  }
}>();

BlogRouters.use('/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || " ";
  
  try{
    const user = await verify(authHeader, c.env.JWT_SECRET);
    
    if (user) {
      // Set the userId in the context
      c.set('userId', user.id);
      await next();
  } else {
      return c.json({
          message: "You are not logged in"
      }, 403); // Return a 403 Forbidden status
  }}
  catch(e){
    return c.json({
      message:"you are not logged in "
    })
  }
});

BlogRouters.post('/',async (c)=>{
    const body = await c.req.json(); 
    const {success}= createBlogInput.safeParse(body)
    if(!success){
      return c.json({
        message:"inputs are not valid"
      })
    }
    const authorId = c.get("userId");
  
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      
      const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
      })


      return c.json({
        id:blog.id
      })
})
BlogRouters.put('/',async (c)=>{
    const body = await c.req.json(); 
    const {success}= UpdateBlogInput.safeParse(body)
    if(!success){
      return c.json({
        message:"inputs are not valid"
      })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      
      const blog=await prisma.post.update({
          where:{
            id: body.id
            
        },
        data:{
            title:body.title,
            content:body.content
        }
      })


      return c.json({
        id:blog.id
      })
})

BlogRouters.get('/bulk',async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      
      const blog=await prisma.post.findMany()


      return c.json({
        blog
      })
})

BlogRouters.get('/:id',async(c)=>{

    const id = await c.req.param("id"); 
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      
     try{ const blog=await prisma.post.findFirst({
          where:{
            id: id
            
        },
      
      })


      return c.json({
        blog
      })}
      catch(e){

        return c.json({
            message:"error while fetching blog"
        })
      }

})


