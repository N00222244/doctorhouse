import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";




const CreateDocotor = () => {


    const navigate = useNavigate
    const token = useAuth();


    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        specialisation: ''
    });


    const handleSubmit = (e) => {
        

        e.preventDefault();
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.post(`https://fed-medical-clinic-api.vercel.app/doctors`, form.values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 

            navigate("/app/home");
        })
        .catch((err) =>{ // catch any erros and log them to the console
            console.log(err);
        });

    }


    const handleChange = (e) => {
       setForm(({...form, [e.target.name]: e.target.value})); 
    }
    

    const specialisations = [
        'Podiatrist',
        'Dermatologist',
        'Pediatrician',
        'Psychiatrist',
        'General Practitioner',
    ]
    
    
    
    
    
    
    return (
        <>

            <form>
                <input onChange={handleChange} value={form.first_name} type='text' name="first_name" placeholder="Enter First name" ></input>
                <input onChange={handleChange} value={form.last_name} type='text' name="last_name" placeholder="Enter Last name" ></input>
                <input onChange={handleChange} value={form.email} type='email' name="email" placeholder="Enter Email"></input>
                <input onChange={handleChange} value={form.phone} type='phone' name="phone" placeholder="Enter Phone"></input>
                <input onChange={handleChange} value={form.specialisation} type='specialisation' name="specialisation" placeholder="Enter your specialisation"></input>
                <button onClick={handleSubmit}>Create Docotor</button>
                
            </form>


        </>
    )
}

export default CreateDocotor;