import styles from "./home.module.css";
import Nav from '../../components/nav/nav'
import Header from "../../components/header/header";

import jwt_decode from 'jwt-decode'
import { useSelector } from "react-redux";

function Home(){

    const user = useSelector(state => state)
    console.log(user);
    const decodedToken = jwt_decode(user.token)
    console.log(decodedToken);

    return(
        <div className={styles.home}>
            <Nav foto={decodedToken.photo}/>
            <Header user={decodedToken}/>
            
        </div>
    )
    
}

export default Home