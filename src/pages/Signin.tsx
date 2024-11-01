import Auth from "../component/Auth"
import Quote from "../component/quote"

const Signin = () => {
  return (
    <div >
    <div className="grid grid-cols-2">
        <div>
            <Auth type="signin"/>

        </div>
        <div className=" invisible lg:visible">

        <Quote/>
        </div>
    </div>
    </div>
  )
}

export default Signin