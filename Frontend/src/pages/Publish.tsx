import axios from "axios";

import { BACKEND_URl } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

const Publish = () => {
  const [title, setTitle] = useState(" ");
  const [content, setContent] = useState(" ");
    const navigate = useNavigate();
  return (
    <div className="">
      <Header />
        {/* For TTTLE */}
      <div className="w-full pt-10">
            <div className="flex justify-center">
                <input
                onChange={(e)=>{setTitle(e.target.value)}}
                    id="message"
                    className="focus:outline-none  resize-none max-w-3xl block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Title">

                </input>
            </div>
       
        </div>
      <ContentEditor onChange={(e)=>{setContent(e.target.value)}} />
      <div className="flex justify-start pt-2 max-w-3xl mx-auto">
        <button
          onClick={async () => {
            const token = localStorage.getItem("token");
            console.log(token)

      // Log the token to check if it exists
      console.log("JWT Token:", token);

            const response = await axios.post( `${BACKEND_URl}/api/v1/blog`,
              {
                title,
                content,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            navigate(`/blog/${response.data.id}`);
          }}
          type="submit"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish post
        </button>
      </div>

      <div></div>
    </div>
  );
};
export default Publish;



export function ContentEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=> void}) {
  return (
    <div>
      <form className="pt-2">
        <div className="flex justify-center">
          <div className="flex flex-col w-full max-w-3xl">
            <textarea
            onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}
