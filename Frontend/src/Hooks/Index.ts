import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URl } from "../config";
import Blog from '../pages/Blog';

interface Blog{
    "content": string,
    "title": string
    "id": string,
    "author": {
        "name": string
    }
}
export const useBlog = () => {


    const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{

        axios.get(`${BACKEND_URl}/api/v1/blog/bulk`,{
            headers:{
                Authorization:  localStorage.getItem("tocken")
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


