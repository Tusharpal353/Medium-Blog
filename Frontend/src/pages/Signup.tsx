import Auth from "../component/Auth"
import Quote from "../component/Quote"


const Signup = () => {
  return (
    <div >
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="signup"/>

        </div>
        <div className=" hidden lg:block">

        <Quote/>
        </div>
    </div>
    </div>
  )
}

export default Signup