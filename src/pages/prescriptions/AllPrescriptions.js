import { Button, SimpleGrid , Card, Text, Title,Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";




const Prescriptions = () =>{

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    
    
    const [prescriptions, setPrescriptions] = useState([]);
    const [patients, setPatients] = useState([]);
    



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
           <Title order={1} fw={700} mt={20} >Prescriptions</Title>
                <Button mb={20} onClick={() => navigate(`../prescriptions/create`)}>Create New Prescription</Button>
                            <SimpleGrid cols={{sm:1, md:2, lg:3, xl:4}}>
                                {prescriptions && prescriptions.map((prescription) =>{
                                return(
                                    
                                        
                                        
                                        


                                    <Card onClick={() => navigate(`../prescriptions/${prescription.id}`)}
                                            shadow="sm" padding="lg" radius="md" withBorder style={{height: "100%"}}>
                                            
                                            <Text fw={500} size="md" >
                                                Medication: <br/> {prescription.medication}
                                            </Text>

                                            <Text fw={500} size="md" mt="md" >
                                                Dosage: <br/> {prescription.dosage}
                                            </Text>

                                            <Group>
                                            <Text fw={500}  size="xs" mt="md">
                                               Start Date: <br/> {new Date(prescription.start_date * 1000).toLocaleDateString()}
                                            </Text>

                                            <Text fw={500}  size="xs" mt="md">
                                               End Date: <br/> {new Date(prescription.end_date * 1000).toLocaleDateString()}
                                            </Text>
                                            </Group>

                                        </Card>


                                    
                                    
                            )})}

                            </SimpleGrid>
        </>
    )

}

export default Prescriptions;

