
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@mantine/core";



const SingleAppointment = () => {


    const {token} = useAuth(); // grab token from useAuth
    const  [appointment, setAppointment] = useState(null); // set the Appointment state
    const {id} = useParams(); // grabs id from the url defiend as :id within app.js 
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);



    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, { // send get reques to url
            headers: {
                Authorization: `Bearer ${token}`, // send this auth header with a bearer token
            },
        }) 
        .then((res) => {
            console.log(res.data); //when succesful log the response data to the console to chekc its there
            setAppointment(res.data); // store data wtihin set docotr to update teh state
        })
        .catch((err) => {
            console.log(err)
        });

    }, [id, token]); // rerun if these variable values change



    const DeleteAppointment = async () => {
    try {
        await axios.delete(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        
        navigate('/app/home');


     } catch (err) { 
         console.error("Error deleting Appointment:", err);
     }
    }




   
    

    
    
    return appointment && (
        <>

        

        <h2>Appointment ID: {appointment.id}</h2>
        <h2>Appointment Date: {new Date(appointment.appointment_date * 1000).toLocaleDateString()}</h2>
        <h2>Patient ID: {appointment.patient_id}</h2>
        <h2>Doctors ID: {appointment.doctor_id}</h2>
        


        
        <button onClick={() => navigate(`../appointments/${appointment.id}/edit`)}>Edit Appointment</button>
        <Button onClick={DeleteAppointment}>Delete Appointment</Button>
        
        
        
        </>
    )
}

export default SingleAppointment;