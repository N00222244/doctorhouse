import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
// We don't want the name 'Navbar' to conflict with the Mantine component of the same name
// So we use an alias 'MantineNavbar' to refer to the Mantine component
import { Navbar as MantineNavbar, Button, Fieldset , TextInput, Card, SimpleGrid, Text, Title, AppShell, Container, Center, Stack, Group} from '@mantine/core';
import { useState , useEffect} from 'react';
import axios from 'axios';






const LandingPage = () => {


    const [doctors,setDoctors] = useState([]);


    const getDoctors = async () => {
        try{
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/doctors`)
            setDoctors(res.data)
        }
        catch(e){
            console.error(e)
        }
    };


    useEffect(() => {
    
            const fetchData = async () =>{
    
                await getDoctors();
                
            }
            fetchData();
    
        }, []);
    



    return (
        <div>


            
        <Container >

            

        <Stack align="center" justify="center">
            <h1   >BriarWood Medical Centre</h1>
            <h3 fw={600} order={2}>Welcome to BriarWood Medical Center, At BriarWood, 
            Patients needs  are put above  everything,  whether it be from appointments to 
            to prescriptions we will make your healthcare as stressfreee as possible.  Please note: 
            This is our admin portal and not accessabile to the general public please contact us for further inquiry.</h3>



           
            <Group>
            <Button w={400} color="orange" variant='filled' component={Link} to='/register'>Register</Button>
            <Button w={400} color="green" variant='filled' component={Link} to='/login' >Login</Button>
            
            </Group>


             <Title order={3} fw={700} >Our Doctors</Title>


             </Stack>
            <SimpleGrid cols={{sm:1, md:2, lg:3, xl:4}} pt={20} pb={20}>
                    {/* checks if there are doctors then maps each doctor in the array and displays them as designed within the return statement */}
                            {doctors && doctors.map((doctor) =>{
                                return(
                                    <div>
                                        

                                        <Card 
                                            shadow="sm" padding="lg" radius="md" withBorder style={{height: "100%"}}>
                                            
                                            <Text fw={500} size="lg" >
                                                Name: <br/> {doctor.first_name}{doctor.last_name}
                                            </Text>

                                            <Text fw={500}  size="sm" mt="md">
                                                Specialisation  <br/> {doctor.specialisation}
                                            </Text>

                                            <Text fw={500}  size="sm" mt="md">
                                                Phone No: <br/> {doctor.phone}
                                            </Text>

                                        </Card> 
                                    </div>
                            )})}
                    </SimpleGrid>
            

        </Container>


            

        </div>
    );
};

export default LandingPage;
