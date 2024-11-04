import { Blog } from "../Hooks/Index"
import Header from "./Header"
import { Avatar } from './BlogCard';


const FullBlog = ({blog}:{blog?:Blog | null}) => {
  if (!blog ) {
    return <div>No blog data available.</div>; // Handle the case where blog is undefined or empty
  }
  return (
    <>

        <Header/>
 
    <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl pt-10">
   
        <div className="col-span-7 ">
            <div className=" text-5xl font-bold">
                {blog.title}    
            </div>
            <div className="pt-2 pb-4 text-gray-400">
                posted on 2nd Nov 2024
            </div>
            <div className="font-sans">
                {blog.content}    
            </div>

        </div>
        <div className="col-span-5 ">
              <div className="pb-2 text-gray-600 font-bold">Author</div>

              <div className="flex ">
                <div className="pr-4 flex flex-col justify-center   ">
                    <Avatar  size="big" name={blog.author.name || "Anonymus"}/>
                </div>
                <div>
                <div className="font-bold text-xl">
                
                {blog.author.name || "Anonymus"}
               </div>
             <div className="text-gray-400">
               Author on Dev.to, I write about Blockchain and Tech
             </div>
                </div>
              </div>
             
        </div>


    </div>

    
    </>
  )
}

export default FullBlog