import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../utils/useAuth";
import { Fieldset, TextInput, PasswordInput, Button } from "@mantine/core";

const RegisterForm = (props) => {


    const navigate = useNavigate();
    const {login} = useAuth();


    // create state variable named form, form object holds email and password values
    // setform updates with new data causing react to re render with ne form data
    const [form, setForm] = useState
    ({
        first_name:'',
        last_name: '',
        email:'',
        password:''
    });


    // page refreshes on submit automatically this prevents it from happpening then calls the login  function from use auth in utility
    const handleSubmit = (e) =>{

        e.preventDefault();

        // sends a post request to the api url with the form data
        axios.post(`https://fed-medical-clinic-api.vercel.app/register`, form)
        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 


            localStorage.setItem("user", JSON.stringify(res.data.user));

            login(form.email, form.password); // calls the login function from use auth

            navigate("/");
        })
        .catch((err) =>{ // catch any erros and log them to the console
            console.log(err);
        });

    }

    // handlechange updates the current value of a field with new values
    const handleChange = (e) => {
       setForm(({...form, [e.target.name]: e.target.value})); 
    }

    return (
        
        


        
            <form>
                <TextInput onChange={handleChange} value={form.first_name} type='text' name="first_name" placeholder="Enter Your First name" ></TextInput>
                <TextInput onChange={handleChange} value={form.last_name} type='text' name="last_name" placeholder="Enter Your Last name" ></TextInput>
                <TextInput onChange={handleChange} value={form.email} type='email' name="email" placeholder="Enter Your Email"></TextInput>
                <TextInput onChange={handleChange} value={form.password} type='password' name="password" placeholder="Enter your password"></TextInput>
                <Button onClick={handleSubmit}>Submit Registration</Button>
            </form>
        




        
    )


} 


export default RegisterForm;