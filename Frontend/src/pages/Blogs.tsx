import BlogCard from "../component/BlogCard";
import Header from "../component/Header";
import {Shimmer} from "../component/Shimmer";
import { useBlog } from "../Hooks";

const Blogs = () => {
  const { loading, blogs } = useBlog();
  if (loading) {
    return <div className="flex justify-center flex-col f"> 
       <Header />
    <div className="flex justify-center">
      <div >
      <Shimmer/>
      <Shimmer/>
      <Shimmer/>
      <Shimmer/>
      <Shimmer/>
      <Shimmer/>
      <Shimmer/>
      <Shimmer/>
      </div>
      </div>
      </div>;
    //later change it with SHIMMER
  }

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className=" ">
          {blogs.map((blog) => (
            <BlogCard
            key={blog.id}
            id={blog.id}
              authorName={blog.author.name || "Anonomus"}
              title={blog.title}
              content={blog.content}
              publishedDate={"1 nov 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
