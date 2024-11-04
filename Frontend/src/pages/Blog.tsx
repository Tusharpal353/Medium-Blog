import { useParams } from "react-router-dom";
import { useGetBlog } from "../Hooks/Index"
import FullBlog from "../component/FullBlog";
import { BlogShimeer } from "../component/Shimmer";
import Header from "../component/Header";

const Blog = () => {
 
  const { id } = useParams();
  const { loading, blog } = useGetBlog({
    id:id || ""
  });
  if (loading) {
    return <div>
       <Header/>
      <BlogShimeer/>
      
    </div>;
  }
  return <div>
    
    <FullBlog blog={blog}/>
  </div>;
};

export default Blog;
