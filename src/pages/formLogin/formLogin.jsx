import styles from "./fromLogin.module.css"
import axios from "axios"
import { useState } from "react"
import { Input, Stack, InputGroup, InputLeftElement,Button, InputRightElement,  } from '@chakra-ui/react';
import { EmailIcon, UnlockIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loginAction } from  "../../actions/userActions"



function FormLogin() {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL

    function login(){

        let data = JSON.stringify({
            password,
            email
        })
        
        axios.post(`${baseUrl}/login`, data, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then(res => {
            const token = res.headers.authorization
            if(res.status == 200){
                dispatch(loginAction(token))
                
                navigate("/home")
                console.log("sucesso")
            }else{
                console.log('Erro')
            }


          })
          .catch(error => {
            console.log(error);
          });
        

    }
    return(

        <form className={styles.form}>
            <h1>Login</h1>
            <Stack spacing={4}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                    <EmailIcon/>
                    </InputLeftElement>
                    <Input 
                        type='email' 
                        name="email" 
                        placeholder='Email' 
                        onChange={(e)=> setEmail(e.target.value)}
                        autoComplete="none"
                    />
                </InputGroup>

                <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Senha'
                    name="password"
                    onChange={(e)=> setPassword(e.target.value)}
                />

                <InputLeftElement pointerEvents='none'>
                    <UnlockIcon/>
                </InputLeftElement>

                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>

                </InputGroup>

                <Button colorScheme='messenger' onClick={login}>Login</Button>
            </Stack>
            <p> Primeira vez aqui? <br/>
                <Link to="/register">Cadastre-se</Link>
            </p>
        </form>


    )
}

export default FormLogin