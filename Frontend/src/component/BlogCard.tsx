import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string
}

const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}` }>
            <div className="">
                <div className="py-4 w-screen  max-w-screen-sm cursor-pointer">

                    <div className="flex flex-row ">
                        <div className="pr-2">
                            <Avatar name={authorName} size="small" />
                        </div>
                        <div className="text-sm text-gray-500 pr-2">
                            {authorName}. {publishedDate}
                        </div>
                    </div>

                    <div className="font-bold text-2xl">{title}</div>
                    <div className="text-gray-500 text-base">
                        {content.slice(0, 100) + "...."}
                    </div>
                    <div className="text-gray-400 py-4">
                        {`${Math.ceil(content.length / 100)} min Read`}
                    </div>

                    <div className="">
                        <hr />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export function Avatar({
    name,
    size = "small",
}: {
    name: string;
    size: "small" | "big";
}) {
    return (
        <div
            className={`   relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  ${size === "small" ? "w-6 h-6" : "w-10 h-10"
                }`}
        >
            <span
                className={`${size === "small" ? "text-xs" : "text-lg"
                    } text-gray-600 dark:text-gray-300`}
            >
                {name[0]}
            </span>
        </div>
    );
}

export default BlogCard;
