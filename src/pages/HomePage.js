import { Button, SimpleGrid , AppShell, Burger, Divider,Text, Card, CardSection, Title} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import theme from "../assets/StyleTheme";
import { IconUsersGroup } from '@tabler/icons-react';





const HomePage = () =>{

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    const [opened, { toggle }] = useDisclosure(); // this is to toggle nav on mobile devices 
    
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);



    // define an asynchronus function that waits until the request has been made then calls the set doctors function and passes the response data as param
    // once request is finished it re renders with response data 
    const getDoctors = async () => {
        try{
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/doctors`)
            setDoctors(res.data)
        }
        catch(e){
            console.error(e)
        }
    };

    const getPatients = async () => {
        try{
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/patients`)
            setPatients(res.data)

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

            await getDoctors();
            await getPatients();
        }
        fetchData();

    }, []);


    return (
        <div >
            
            


            
                <Title fw={700} order={1} mt={20}>Doctors</Title>


                    <Button mb={20} onClick={() => navigate(`../doctors/create`)}>Create New Doctor</Button>
                        <SimpleGrid cols={{sm:1, md:2, lg:3, xl:4}}>
                    {/* checks if there are doctors then maps each doctor in the array and displays them as designed within the return statement */}
                            {doctors && doctors.map((doctor) =>{
                                return(
                                    <div>
                                        

                                        <Card onClick={() => navigate(`../doctors/${doctor.id}`)}
                                            shadow="sm" padding="lg" radius="md" withBorder style={{height: "100%"}}>
                                            
                                            <Text fw={500} size="lg" >
                                                Name: <br/> {doctor.first_name}{doctor.last_name}
                                            </Text>

                                            <Text fw={500}  size="sm" mt="md">
                                                Phone No: <br/> {doctor.phone}
                                            </Text>

                                        </Card> 
                                    </div>
                            )})}
                        </SimpleGrid>



                
                
                <Divider my="md"/>

                <Title fw={700} order={1}>Patients <IconUsersGroup size={24} stroke={1.5} /></Title>
                <Button mb={20} onClick={() => navigate(`../patients/create`)}>Create New Patient</Button>
                            <SimpleGrid cols={{sm:1, md:2, lg:3, xl:4}} style={{alignItems: "stretch"}}>
                                {patients && patients.map((patient) =>{
                                return(
                                    <div>

                                        <Card onClick={() => navigate(`../patients/${patient.id}`)}
                                         shadow="sm" padding="lg" radius="md" withBorder style={{height: "100%"}}>
                                            

                                            <Text fw={500} size="lg" >
                                                Name: <br/> {patient.first_name}{patient.last_name}
                                            </Text>

                                            <Text fw={500}  size="sm" mt="md">
                                                Phone No: <br/> {patient.phone}
                                            </Text>

                                            <Text fw={500} size="sm" mt="md">
                                                Address: <br/> {patient.address}
                                            </Text>  
                                        </Card> 

                                        
                                    </div>

                                    
                            )})}

                            </SimpleGrid>

            


            



        


            
        </div>
    )

}

export default HomePage;

