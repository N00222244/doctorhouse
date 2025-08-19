
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Divider } from "@mantine/core";

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
        
        <h2>Prescription ID: {prescription.id}</h2>
        <h2>Patient ID: {prescription.patient_id}</h2>
        <h2>Patient Name: {patient.first_name} {patient.last_name}</h2>
        

        <Divider></Divider>
        <h2>Diagnosis ID: {prescription.diagnosis_id}</h2>
        <h2>Condition: {diagnosis.condition}</h2>
        <Divider></Divider>
        <h2>Medication: {prescription.medication}</h2>
        <h2>Dosage: {prescription.dosage}</h2>
        <h2>Prescription Date: {new Date(prescription.start_date * 1000).toLocaleDateString()}</h2>
        <h2>Prescription Date: {new Date(prescription.end_date * 1000).toLocaleDateString()}</h2>

       

        <Divider></Divider>
        <h2>Doctors ID: {prescription.doctor_id}</h2>
        <h2>Doctor Name: DR {doctor.first_name} {doctor.last_name}</h2>
        
        
        
        
        


        
        <button onClick={() => navigate(`../prescriptions/${prescription.id}/edit`)}>Edit Prescription</button>
        <Button onClick={DeletePrescription}>Delete Prescription</Button>
        
        
        
        </>
    )
}

export default SinglePrescription;