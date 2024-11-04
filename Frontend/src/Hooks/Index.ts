import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URl } from "../config";
/* import Blog from '../pages/Blog'; */

export interface Blog{
    "content": string,
    "title": string
    "id": string,
    "author": {
        "name": string
    }
}


export const useGetBlog=({id}:{id:string})=>{
    const [blog,setBlog] = useState<Blog>()
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        axios.get(`${BACKEND_URl}/api/v1/blog/${id}`,{
            headers:{
                Authorization:  localStorage.getItem("token")
            }
        }).then(
            response => {setBlog(response.data.blog);
                setLoading(false);
            }
        )
    },[id])
    return {
        loading,blog
    }


}


export const useBlog = () => {


    const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{

        axios.get(`${BACKEND_URl}/api/v1/blog/bulk`,{
            headers:{
                Authorization:  localStorage.getItem("token")
            }
        }).then(
            response => {setBlogs(response.data.blog);
                setLoading(false);
            }
        )

    },[])

  return {
    blogs,
    loading,
  };
};


