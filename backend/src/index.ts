import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.post('/api/v1/signup',(c)=>{
  return c.text("this is the POST api/v1/signup route")
})

app.post('/api/v1/signin',(c)=>{
  return c.text("this is the POST api/v1/signin route")
})

app.post('/api/v1/blog',(c)=>{
  return c.text("this is the POST api/v1/signup route")
}) 

app.put('/api/v1/blog',(c)=>{
  return c.text("this is the POST api/v1/signup route")
})

app.get('/api/v1/blog/:id',(c)=>{
  return c.text("this is the POST api/v1/signup route")
})

export default app
