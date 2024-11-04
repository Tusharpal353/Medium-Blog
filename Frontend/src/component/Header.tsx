import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


const Header = () => {
  return (
    <div className="flex justify-between  border border-b-2 py-4 px-10">

      <Link to="/blogs">
        <div className="flex font-bold  text-3xl">
            <h1 className="font-serif tracking-[-0.1em] cursor-pointer">Medium</h1>

        </div>
        </Link>
        <div className="">
          <div> 
            
          </div>
          <Link to={"/publish"}>
          <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl text-sm px-4 py-2 me-2 mb-2 mr-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">create</button>
          </Link>
            <Avatar name="Tushar" size={"big"}  />
        </div>

    </div>
  )
}

export default Header