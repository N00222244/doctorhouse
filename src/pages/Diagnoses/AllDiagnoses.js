import { Button, SimpleGrid , Card , Title, Text} from "@mantine/core";
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
           <Title order={1} fw={700}>Diagnoses</Title>
                <Button mb={20} onClick={() => navigate(`../diagnoses/create`)}>Create New Diagnosis</Button>
                            <SimpleGrid cols={{sm:1, md:2, lg:3, xl:4}}>
                                {diagnoses && diagnoses.map((diagnosis) =>{
                                return(
                                    <>
                                    <Card onClick={() => navigate(`../diagnoses/${diagnosis.id}`)}
                                            shadow="sm" padding="lg" radius="md" withBorder style={{height: "100%"}}>

                                            <Text fw={500}  size="md">
                                                Condition: <br/> {diagnosis.condition}
                                            </Text>
                                            
                                            <Text fw={500} size="md" mt="md" >
                                                Diagnosis Date: <br/> {new Date(diagnosis.diagnosis_date * 1000).toLocaleDateString()}
                                            </Text>

                                        </Card> 
                                        </>
                            )})}

                            </SimpleGrid>
        </>
    )

}

export default Diagnoses;

