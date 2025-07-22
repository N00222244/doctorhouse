import { Button, SimpleGrid , AppShell, Burger, Divider,Text} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";



const HomePage = () =>{

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    const [opened, { toggle }] = useDisclosure(); // this is to toggle nav on mobile devices 
    
    const [doctors, setDoctors] = useState([]);



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


    // useEffect cant be async
    // define fetchdata to be async so can use await to pause the function till the functions within have been cleared before continuing function body
    // [] means run this once 
    useEffect(() => {

        const fetchData = async () =>{

            await getDoctors();
        }
        fetchData();

    }, []);


    return (
        <div>
            <AppShell padding="md" header={{ height: 60 }} navbar={{width: 300,breakpoint: 'sm',collapsed: { mobile: !opened }}}>



            <AppShell.Header >
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm"size="sm"/>
                    
                        <Text>Princeton Plainsbourough Medical Centre </Text>
                    
            </AppShell.Header>
            <Divider my="md"/>

            


            <AppShell.Navbar>navbar tester</AppShell.Navbar>
            


            <AppShell.Main>
                <h2>Docotrs</h2>
                <button onClick={() => navigate(`../doctors/create`)}>Create New Doctor</button>

                    <SimpleGrid cols={3}>


                    {/* checks if there are doctors then maps each doctor in the array and displays them as designed within the return statement */}
                        {
                            doctors && doctors.map((doctor) =>{
                                return (
                                    <div>
                                        <h2>Dr {doctor.first_name}{doctor.last_name}</h2>
                                       <button onClick={() => navigate(`../doctors/${doctor.id}`)}>View Doctor</button>
                                    
                                     </div>
                                )
                            })
            }
                    </SimpleGrid>
            </AppShell.Main>


            



        {/* logout button */}
            {
                    token && (
                        <Button color='red' variant={'outline'} onClick={() => {
                            logout();
                            navigate('/login', { replace: true })
                        }}>Logout</Button>
                    )
                }


            </AppShell>
        </div>
    )

}

export default HomePage;

