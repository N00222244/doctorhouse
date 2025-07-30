import { Button, SimpleGrid , Card } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";




const Prescriptions = () =>{

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    
    
    const [prescriptions, setPrescriptions] = useState([]);
    



    // define an asynchronus function that waits until the request has been made then calls the set doctors function and passes the response data as param
    // once request is finished it re renders with response data 
    const getPrescriptions = async () => {
        const token = localStorage.getItem('token');

        try{
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/prescriptions`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            setPrescriptions(res.data)
        }
        catch(e){
            console.error(e)
        }
    };

    // useEffect cant be async
    // define fetchdata to be async so can use await to pause the function till the functions within have been cleared before continuing function body
    // [] means run this once 
    useEffect(() => {

        const fetchData = async () =>{

            await getPrescriptions();
          
        }
        fetchData();

    }, []);


    return (
        <>
           <h2>Prescriptions</h2>
                <button onClick={() => navigate(`../prescriptions/create`)}>Create New Prescription</button>
                            <SimpleGrid cols={{sm:1, md:2, lg:3, xl:4}}>
                                {prescriptions && prescriptions.map((prescription) =>{
                                return(
                                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <div>
                                        <h2> Prescription ID: {prescription.id}</h2>
                                        <h2> Patient ID: {prescription.patient_id}</h2>
                                        <h2> Doctor ID: {prescription.doctor_id}</h2>
                                        <h2> Diagnosis ID: {prescription.diagnosis_id}</h2>
                                        <h2> Medication: {prescription.medication}</h2>
                                        <h2> Dosage: {prescription.dosage}</h2>
                                        <h2> Start Date: {new Date(prescription.start_date * 1000).toLocaleDateString()}</h2>
                                        <h2> End Date: {new Date(prescription.end_date * 1000).toLocaleDateString()}</h2>
                                        <button onClick={() => navigate(`../prescriptions/${prescription.id}`)}>View Prescription</button>
                                    </div>
                                    </Card>
                            )})}

                            </SimpleGrid>
        </>
    )

}

export default Prescriptions;

