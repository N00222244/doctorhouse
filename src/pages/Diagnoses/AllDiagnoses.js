import { Button, SimpleGrid , Card } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";




const Diagnoses = () =>{

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    
    
    const [diagnoses, setDiagnoses] = useState([]);
    



    // define an asynchronus function that waits until the request has been made then calls the set doctors function and passes the response data as param
    // once request is finished it re renders with response data 
    const getDiagnoses = async () => {
        const token = localStorage.getItem('token');

        try{
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            setDiagnoses(res.data)
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

            await getDiagnoses();
          
        }
        fetchData();

    }, []);


    return (
        <>
           <h2>Diagnoses</h2>
                <button onClick={() => navigate(`../diagnoses/create`)}>Create New Diagnosis</button>
                            <SimpleGrid cols={{sm:1, md:2, lg:3, xl:4}}>
                                {diagnoses && diagnoses.map((diagnosis) =>{
                                return(
                                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <div>
                                        <h2> Date: {new Date(diagnosis.diagnosis_date * 1000).toLocaleDateString()}</h2>
                                        <h2> Patient: {diagnosis.patient_id}</h2>
                                        <button onClick={() => navigate(`../diagnoses/${diagnosis.id}`)}>View Diagnosis</button>
                                    </div>
                                    </Card>
                            )})}

                            </SimpleGrid>
        </>
    )

}

export default Diagnoses;

