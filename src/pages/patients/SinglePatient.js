
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@mantine/core";



const SinglePatient = () => {


    const {token} = useAuth(); // grab token from useAuth
    const  [patient, setPatient] = useState(null); // set the patients state
    const {id} = useParams(); // grabs id from the url defiend as :id within app.js 
    const navigate = useNavigate();



    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, { // send get reques to url
            headers: {
                Authorization: `Bearer ${token}`, // send this auth header with a bearer token
            },
        }) 
        .then((res) => {
            console.log(res.data); //when succesful log the response data to the console to chekc its there
            setPatient(res.data); // store data wtihin set docotr to update teh state
        })
        .catch((err) => {
            console.log(err)
        });

    }, [id, token]); // rerun if these variable values change



    const DeletePatient = async () => {
    try {
        await axios.delete(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        
        navigate('/app/home');


     } catch (err) { 
         console.error("Error deleting patient:", err);
     }
    }

    
    return patient && (
        <>

        <h2>Patient ID: {patient.id}</h2>
        <h1>Full Name: {patient.first_name} {patient.last_name}</h1>
        <h2>First Name : {patient.first_name}</h2>
        <h2>First Name : {patient.last_name}</h2>
        <h2>Date of Birth: {patient.date_of_birth}</h2>
        <h2>Email: {patient.email}</h2>
        <h2>Phone No: + 353 {patient.phone}</h2>
        <h2>Address {patient.address}</h2>
        


        
        <button onClick={() => navigate(`../patients/${patient.id}/edit`)}>Edit Patient</button>
        <Button onClick={DeletePatient}>Delete Patient</Button>
        
        
        
        </>
    )
}

export default SinglePatient;