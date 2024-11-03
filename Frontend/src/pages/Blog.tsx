import { useParams } from "react-router-dom";
import { useGetBlog } from "../Hooks";
import FullBlog from "../component/FullBlog";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useGetBlog({
    id:id || ""
  });
  if (loading) {
    return <div>loading...</div>;
  }
  return <div>

    <FullBlog blog={blog}/>
  </div>;
};

export default Blog;
