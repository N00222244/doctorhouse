
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Divider, Text,Title , Group} from "@mantine/core";

import BackButton from "../../components/BackButton";



const SinglePrescription = () => {


    const {token} = useAuth(); // grab token from useAuth
    const  [prescription, setPrescription] = useState(null); // set the Prescription state
    const {id} = useParams(); // grabs id from the url defiend as :id within app.js 
    const navigate = useNavigate();


    const [patient, setPatient] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [diagnosis, setDiagnosis] = useState([]);



    useEffect((values) => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`, { // send get reques to url
            headers: {
                Authorization: `Bearer ${token}`, // send this auth header with a bearer token
            },
        }) 
        .then((res) => {
                setPrescription(res.data);
                return Promise.all([
                    axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${res.data.doctor_id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${res.data.patient_id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses/${res.data.diagnosis_id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                ]);
            })
            .then(([doctorRes, patientRes, diagnosisRes]) => {
                setDoctor(doctorRes.data);
                setPatient(patientRes.data);
                setDiagnosis(diagnosisRes.data);
            })
        .catch((err) => {
            console.log(err)
        });

    }, [id, token]); // rerun if these variable values change



    const DeletePrescription = async () => {
    try {
        await axios.delete(`https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        
        navigate('/app/home');


     } catch (err) { 
         console.error("Error deleting Prescription:", err);
     }
    }




   
    

    
    
    return prescription && (
        <>

        


        <BackButton/>
        

        <Divider/>
        <Title fw={700} order={2} >Prescription Information</Title>
        <Divider/>

        <Group>
            <Text fw={600}>Prescription ID: </Text>
            <Text fw={400}>{prescription.id}</Text>
        </Group>

        <Group>
            <Text fw={600}>Patient ID: </Text>
            <Text fw={400}>{prescription.patient_id}</Text>
        </Group>

        <Group>
            <Text fw={600}>Patient Name: </Text>
            <Text fw={400}>{patient.first_name} {patient.last_name}</Text>
        </Group>

        
       
        
        

        <Divider/>
        <Title fw={700} order={2} >Diagnosis Information</Title>
        <Divider/>


        <Group>
            <Text fw={600}>Diagnosis ID: </Text>
            <Text fw={400}>{prescription.diagnosis_id}</Text>
        </Group>

          <Group>
            <Text fw={600}>Condition: </Text>
            <Text fw={400}>{diagnosis.condition}</Text>
        </Group>





        

        <Divider/>
        <Title fw={700} order={2} >Medication Information</Title>
        <Divider/>

        <Group>
            <Text fw={600}>Medication: </Text>
            <Text fw={400}>{prescription.medication}</Text>
        </Group>

        <Group>
            <Text fw={600}>Dosage: </Text>
            <Text fw={400}>{prescription.dosage}</Text>
        </Group>

        <Group>
            <Text fw={600}>Prescription Start Date: </Text>
            <Text fw={400}>{new Date(prescription.start_date * 1000).toLocaleDateString()}</Text>
        </Group>

        <Group>
            <Text fw={600}>Prescription End Date: </Text>
            <Text fw={400}>{new Date(prescription.end_date * 1000).toLocaleDateString()}</Text>
        </Group>


        


        
        <Divider/>
        <Title fw={700} order={2} >Doctor Information</Title>
        <Divider/>


        <Group>
            <Text fw={600}>Doctors ID: </Text>
            <Text fw={400}>{prescription.doctor_id}</Text>
        </Group>

        <Group>
            <Text fw={600}>Doctor Name: </Text>
            <Text fw={400}>DR {doctor.first_name} {doctor.last_name}</Text>
        </Group>
        

        <Divider/>
        <Title fw={700} order={2} >Manage</Title>
        <Divider/>
        
        <Group pt={20}>
        <Button color="green" onClick={() => navigate(`../prescriptions/${prescription.id}/edit`)}>Edit Prescription</Button>
        <Button color="red" onClick={DeletePrescription}>Delete Prescription</Button>
        </Group>
        
        
        </>
    )
}

export default SinglePrescription;