
- app.get('/api/v1/blog/:id',(c)=>{
  return c.text("this is the POST api/v1/signup route")
})
-  c here stand for CONTEXT it has req res and all the things

- cloudflare is a serverless architecture means our code is deployed on mini machnies  on the server at multiple server location , our code run on the 100 machines 

- we dont let the server talk directly to our databse we use **CONNECTION POOL** 
    many server send multiple request to this this send sinlge request to the Database

    - prisma help us in connection pool 

step 1
- initialize prisma 
    npm i prisma 
    npx prisma init
    change the DB url in the .env file in prisma 

Wrangler.toml
  it is the place from where enviroment variable will be picked from for the cloudfare worker

Step 2 
  - create a schema in prisma 
  - migrate it
  - generate client - then we can perform FINDONE and all
  

step 3 
 - creating a Middleware to protect a end point




 could have used Zod to do the validation but used another MODULE that will lie betwwen the frontend and the backend