import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../utils/useAuth";
import { Button, Fieldset , TextInput, PasswordInput} from "@mantine/core";

const LoginForm = () => {


    const navigate = useNavigate();
    const {login} = useAuth();


    // create state variable named form, form object holds email and password values
    // setform updates with new data causing react to re render with ne form data
    const [form, setForm] = useState({email:'', password:''})


    // page refreshes on submit automatically this prevents it from happpening then calls the login  function from use auth in utility
    const handleSubmit = (e) =>{

        e.preventDefault();

        login(form.email,form.password);

        navigate("/app/home");

    }

    // handlechange updates the current value of a field with new values
    const handleChange = (e) => {
       setForm(({...form, [e.target.name]: e.target.value})); 
    }

    return (
        <Fieldset legend="Enter Your Login Details">
        <form>

            <TextInput onChange={handleChange} value={form.email} type='email' name="email" placeholder="Email Address"></TextInput>
            <PasswordInput onChange={handleChange} value={form.password} type='password' name='password' placeholder="Password"></PasswordInput>
            <Button onClick={handleSubmit}>Submit Login</Button>
        </form>
        </Fieldset>
    )


} 


export default LoginForm;