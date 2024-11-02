
import BlogCard from '../component/BlogCard'
import Header from '../component/Header'
import { useBlog } from '../Hooks'

const Blogs = () => {

    const { loading, blogs } = useBlog();
    if (loading) {
        return <div>Loading...</div>
        //later change it with SHIMMER
    }


    return (

        <div>
            <Header />
            <div className='flex justify-center'>
                <div className='mx-[10%] flex justify-center flex-col max-w-3xl'>


                    {blogs.map(blog => <BlogCard

                        
                        authorName={blog.author.name || ""}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"1 nov 2024"}

                    />)}



                </div>
            </div>
        </div>
    )
}

export default Blogs