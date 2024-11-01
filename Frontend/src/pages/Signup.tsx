import Auth from "../component/Auth"
import Quote from "../component/quote"


const Signup = () => {
  return (
    <div >
    <div className="grid grid-cols-2">
        <div>
            <Auth type="signup"/>

        </div>
        <div className=" invisible lg:visible">

        <Quote/>
        </div>
    </div>
    </div>
  )
}

export default Signup