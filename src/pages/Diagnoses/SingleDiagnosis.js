
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Divider, Group, Text, Title } from "@mantine/core";
import BackButton from "../../components/BackButton";



const SingleDiagnoses = () => {


    const {token} = useAuth(); // grab token from useAuth
    const  [diagnoses, setDiagnoses] = useState(null); // set the Diagnoses state
    const {id} = useParams(); // grabs id from the url defiend as :id within app.js 
    const navigate = useNavigate();
    const [patient, setPatient] = useState([]);


    



    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, { // send get reques to url
            headers: {
                Authorization: `Bearer ${token}`, // send this auth header with a bearer token
            },
        }) 
        .then((res) => {
            console.log(res.data); //when succesful log the response data to the console to chekc its there
            setDiagnoses(res.data);
                return Promise.all([
                    axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${res.data.patient_id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
            })
            .then(([patientRes]) => {
                setPatient(patientRes.data);
            })
        .catch((err) => {
            console.log(err)
        });

    }, [id, token]); // rerun if these variable values change



    const DeleteDiagnoses = async () => {
    try {
        await axios.delete(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        
        navigate('/app/home');


     } catch (err) { 
         console.error("Error deleting Diagnosis:", err);
     }
    }




   
    

    
    
    return diagnoses && (
        <>

        <BackButton/>


        <Divider/>
            <Title fw={700} order={2}>Diagnosis Information</Title>
        <Divider/>

        <Group>
            <Text fw={600}>Diagnoses ID:</Text> 
            <Text fw={400}> {diagnoses.id}</Text>
        </Group>

        <Group>
            <Text fw={600}>Condition:</Text> 
            <Text fw={400}> {diagnoses.condition}</Text>
        </Group>

        <Group>
            <Text fw={600}>Diagnoses Date:</Text> 
            <Text fw={400}> {new Date(diagnoses.diagnosis_date * 1000).toLocaleDateString()}</Text>
        </Group>



        <Divider/>
            <Title fw={700} order={2}>Patient Information</Title>
        <Divider/>


        <Group>
            <Text fw={600}>Patient ID:</Text> 
            <Text fw={400}> {diagnoses.patient_id}</Text>
        </Group>

        <Group>
            <Text fw={600}>Patient Name:</Text> 
            <Text fw={400}> {patient.first_name}{patient.last_name}</Text>
        </Group>


        <Divider/>
            <Title fw={700} order={2}>Manage </Title>
        <Divider/>
    

        <Group pt={20}>
            <Button color="green" onClick={() => navigate(`../diagnoses/${diagnoses.id}/edit`)}>Edit Diagnosis</Button>
            <Button color="red" onClick={DeleteDiagnoses}>Delete Diagnosis</Button>
        </Group>
        
        
        </>
    )
}

export default SingleDiagnoses;