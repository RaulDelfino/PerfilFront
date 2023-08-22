import styles from "./fromRegister.module.css"
import { useState } from "react"
import { Input, Stack, InputGroup, InputLeftElement,Button, InputRightElement,  } from '@chakra-ui/react';
import { EmailIcon, UnlockIcon } from '@chakra-ui/icons';
import { Book, FilePng, Phone, User } from '@phosphor-icons/react'
import { Link } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from  "../../actions/userActions"
import * as Yup from "yup"

function FormRegister(){
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [formData, setFormData] = useState({ 
    name: '', 
    email: '',
    password: '',
    photo: '',
    phone: '',
    bio: ''
    });
    const [errors, setErrors] = useState({email:"", password:"", name:""})
    const [emailExistsError, setEmailExistsError] = useState("");


    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));  //  passar valor de acordo com o nome no formulario
        
    };

    const handleEmailChange = () => {
        setEmailExistsError(""); 
        
    };
    

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email('Digite um email válido').required('O email é obrigatório'),
        password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
    });

    async function register(e) {
        e.preventDefault()

        
        try {
            await validationSchema.validate(formData, { abortEarly: false });

            console.log('Dados válidos. Registrando...');

            axios.post(`${baseUrl}/registro`, formData, {
                headers: {
                  'Content-Type': 'application/json',
                }
            }).then(res => {
                const token = res.headers.authorization
                if(res.status == 200){
                    setErrors({})
                    dispatch(loginAction(token))
                    navigate("/home")
                    console.log("sucesso")
                }else{
                    console.log('Erro')
                }
            }).catch(e => {setEmailExistsError(e.response.data.message)});
            
            

        } catch (validationErrors) {
            const errors = {};
    
            if (validationErrors.inner) {
                validationErrors.inner.forEach((error) => {
                    errors[error.path] = error.message;
                });
            } else {
                errors.generic = 'Erro de validação';
            }
    
            setErrors(errors);
        }

    }



    return(

        <form className={styles.form} onSubmit={register} autoComplete="off">
            <h1>Cadastro</h1>
            <Stack spacing={4}>
                
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            < User />
                        </InputLeftElement>
                        <Input 
                        type='text' 
                        name="name" 
                        placeholder='Digite seu nome' 
                        
                        value={formData.name}
                        onChange={handleChange}
                        />
                    </InputGroup>
                    {errors.name && <div style={{ color: 'red', fontSize:"14px", margin:"0", padding:"0" }}>{errors.name}</div>}
                    
   
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <EmailIcon/>
                        </InputLeftElement>
                        <Input 
                        type='text' 
                        name="email"placeholder='Email' 
                        value={formData.email}
                       
                        onChange={(e) =>  {
                            handleEmailChange()
                            handleChange(e)
                            }}
                        />
                    </InputGroup>
                    
                    {errors.email && <div style={{ color: 'red', fontSize:"14px",  margin:"0", padding:"0"}}>{errors.email}</div>}
                    {emailExistsError && <div style={{ color: 'red', fontSize:"14px", margin:"0", padding:"0" }}>{emailExistsError}</div>}
                    <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Senha'
                        name="password"
                        
                        value={formData.password}
                        onChange={handleChange}
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
                    {errors.password && <div style={{ color: 'red', fontSize:"14px",  margin:"0", padding:"0"}}>{errors.password}</div>}
                    
                    
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <Phone size={22}/>
                        </InputLeftElement>
                        <Input 
                        type='number' 
                        name="phone" 
                        placeholder='Telefone' 
                        
                        value={formData.phone}
                        onChange={handleChange}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                        <FilePng size={22} />
                        </InputLeftElement>
                        <Input 
                        type='text' 
                        name="photo" 
                        placeholder='Foto URL'
                        
                        value={formData.photo}
                        onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                        <Book size={22} />
                        </InputLeftElement>
                        <Input 
                        type='text' 
                        name="bio"
                        
                        placeholder='sua Bio' 
                        value={formData.bio}
                        onChange={handleChange}
                        />
                    </InputGroup>


                    <Button colorScheme='messenger' type="submit">Cadastrar</Button>
                
                            

            <p> Já possui cadastro? <br/>
                <Link to="/">Faça o Login</Link>
            </p></Stack>
        </form>
    )
}

export default FormRegister