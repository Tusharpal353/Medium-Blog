import { Avatar } from "./BlogCard"


const Header = () => {
  return (
    <div className="flex justify-between  border border-b-2 py-4 px-10">
        <div className="flex font-bold  text-3xl">
            <h1 className="font-serif tracking-[-0.1em]">Medium</h1>

        </div>
        <div className="">
            <Avatar name="Tushar" size={"big"}  />
        </div>

    </div>
  )
}

export default Header