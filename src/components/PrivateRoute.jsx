import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"




const PrivateRoute = ({children, redirectTo}) => {
    const user = useSelector(state => state)
    console.log(user)
    return user ? children :  <Navigate to={redirectTo}/>

}
export default PrivateRoute