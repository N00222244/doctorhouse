
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@mantine/core";



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

        

        <h2>Diagnoses ID: {diagnoses.id}</h2>
        <h2>Condition: {diagnoses.condition}</h2>
        <h2>Diagnoses Date: {new Date(diagnoses.diagnosis_date * 1000).toLocaleDateString()}</h2>
        <h2>Patient ID: {diagnoses.patient_id}</h2>
        <h2>Patient Name: {patient.first_name}{patient.last_name}</h2>
        
        
        


        
        <button onClick={() => navigate(`../diagnoses/${diagnoses.id}/edit`)}>Edit Diagnosis</button>
        <Button onClick={DeleteDiagnoses}>Delete Diagnosis</Button>
        
        
        
        </>
    )
}

export default SingleDiagnoses;