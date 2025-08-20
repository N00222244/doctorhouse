
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Divider, Group,Title, Text } from "@mantine/core";
import BackButton from "../../components/BackButton";



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

   // let timeConversion = new Date(patient.date_of_birth * 1000)
   // console.log(timeConversion);


   
    

    
    
    return patient && (
        <>

        
        <BackButton/>

        <Divider/>
        <Title fw={700} order={2} >Patient Information</Title>
        <Divider/>


        <Group>
            <Text fw={600}>Patient ID:</Text>
            <Text fw={400}>{patient.id}</Text>
        </Group>

        <Group>
            <Text fw={600}>Full Name:</Text>
            <Text fw={400}>{patient.first_name} {patient.last_name}</Text>
        </Group>

        <Group>
            <Text fw={600}>Date of Birth:</Text>
            <Text fw={400}>{new Date(patient.date_of_birth * 1000).toLocaleDateString()}</Text>
        </Group>




        
        
        
        <h3> </h3>

        <Divider/>

        <Title fw={700} order={2} >Contact Information</Title>
        <Divider />
        
        <Group>
            <Text fw={600}>Email: </Text>
            <Text fw={400}>{patient.email}</Text>
        </Group>

        
        <Group>
            <Text fw={600}>Phone No:</Text> 
            <Text fw={400}> + 353 {patient.phone}</Text>
        </Group>

        <Group>
            <Text fw={600}>Address:</Text>
            <Text fw={400}> {patient.address}</Text>

        </Group>
        
        
        

        
        
        <Divider/>
            <Title fw={700} order={2}>Manage</Title>
        <Divider/>
        <Group pt={20}>
            <Button onClick={() => navigate(`../patients/${patient.id}/edit`)}>Edit Patient</Button>
            <Button onClick={DeletePatient}>Delete Patient</Button>
        </Group>
        
        
        
        </>
    )
}

export default SinglePatient;