import { Button, SimpleGrid , Card, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";




const Appointments = () =>{

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    
    
    const [appointments, setAppointments] = useState([]);
    



    // define an asynchronus function that waits until the request has been made then calls the set doctors function and passes the response data as param
    // once request is finished it re renders with response data 
    const getAppointments = async () => {
        const token = localStorage.getItem('token');

        try{
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/appointments`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            setAppointments(res.data)
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

            await getAppointments();
          
        }
        fetchData();

    }, []);


    return (
        <>
           <Title order={1} fw={700} >Appointments</Title>
                <Button mb={20} onClick={() => navigate(`../appointments/create`)}>Create New Appointment</Button>
                            <SimpleGrid cols={{sm:1, md:2, lg:3, xl:4}}>
                                {appointments && appointments.map((appointment) =>{
                                return(
                                    <>
                                    <Card onClick={() => navigate(`../appointments/${appointment.id}`)}
                                            shadow="sm" padding="lg" radius="md" withBorder style={{height: "100%"}}>

                                            <Text fw={500}  size="md">
                                                Date: <br/> {new Date(appointment.appointment_date * 1000).toLocaleDateString()}
                                            </Text>
                                            
                                            <Text fw={500} size="md" mt="md" >
                                               Patient: <br/> {appointment.patient_id}
                                            </Text>

                                        </Card> 


                                    </>
                            )})}

                            </SimpleGrid>
        </>
    )

}

export default Appointments;

