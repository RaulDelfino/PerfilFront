import styles from "./nav.module.css";
import { ChevronDownIcon } from "@chakra-ui/icons"
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
  } from '@chakra-ui/react'
import { useDispatch,  } from "react-redux";
import { logoutAction } from "../../actions/userActions"
import { useNavigate, Link } from "react-router-dom";



function Nav({foto}){
    

    const dispatch = useDispatch()
    const navegate = useNavigate()

    console.log(foto)

    function logout(){
        dispatch(logoutAction())
        navegate("/")
    } 

    return (
        <nav className={styles.nav}>
            <h1>LoginDev</h1>

            <div className={styles.menu}>
                <img src={foto}/>
                <div className={styles.menuButton}>               
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Menu
                        </MenuButton>
                        <MenuList>
                            <MenuItem><Link to={"/home"}>Meu Perfil</Link></MenuItem>
                            <MenuDivider/>
                            <MenuItem color={"red"} onClick={()=> logout()}>Sair</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>

        </nav>
        )
}

export default Nav