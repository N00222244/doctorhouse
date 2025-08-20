
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Divider, Group, Title, Text } from "@mantine/core";
import BackButton from "../../components/BackButton";



const SingleAppointment = () => {


    const {token} = useAuth(); // grab token from useAuth
    const  [appointment, setAppointment] = useState(null); // set the Appointment state
    const {id} = useParams(); // grabs id from the url defiend as :id within app.js 
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState([]);
    const [patient, setPatient] = useState([]);



    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, { // send get reques to url
            headers: {
                Authorization: `Bearer ${token}`, // send this auth header with a bearer token
            },
        }) 
        .then((res) => {
                setAppointment(res.data);
                return Promise.all([
                    axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${res.data.doctor_id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${res.data.patient_id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
            })
            .then(([doctorRes, patientRes]) => {
                setDoctor(doctorRes.data);
                setPatient(patientRes.data);
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

        <BackButton/>


        <Divider/>
            <Title fw={700} order={2}>Appointment Information</Title>
        <Divider/>


        <Group>
            <Text fw={600}>Appointment ID:</Text> 
            <Text fw={400}> {appointment.id}</Text>
        </Group>

        <Group>
            <Text fw={600}>Appointment Date:</Text> 
            <Text fw={400}> {new Date(appointment.appointment_date * 1000).toLocaleDateString()}</Text>
        </Group>
        

        
        
        

        <Divider/>
            <Title fw={700} order={2}>Patient Information</Title>
        <Divider/>


        <Group>
            <Text fw={600}>Patient ID:</Text> 
            <Text fw={400}> {appointment.patient_id}</Text>
        </Group>

        <Group>
            <Text fw={600}>Patient:</Text> 
            <Text fw={400}> {patient.first_name} {patient.last_name}</Text>
        </Group>

        <Divider/>
            <Title fw={700} order={2}>Doctor Information</Title>
        <Divider/>

        <Group>
            <Text fw={600}>Doctors ID:</Text> 
            <Text fw={400}> {appointment.doctor_id}</Text>
        </Group>

        <Group>
            <Text fw={600}>Doctor:</Text> 
            <Text fw={400}> {doctor.first_name} {doctor.last_name}</Text>
        </Group>    
        

        <Divider/>
            <Title fw={700} order={2}> Manage</Title>
        <Divider/>
        
        <Group pt={20}>
        <Button color="green" onClick={() => navigate(`../appointments/${appointment.id}/edit`)}>Edit Appointment</Button>
        <Button color="red" onClick={DeleteAppointment}>Delete Appointment</Button>
        </Group>
        
        
        </>
    )
}

export default SingleAppointment;