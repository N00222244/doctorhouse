import { Button, SimpleGrid , AppShell, Burger, Divider,Text, Stack, Center, Title } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
import {IconPill, IconClipboardPlus, IconCalendar ,IconHome} from "@tabler/icons-react";
import image from "../assets/image.png"








const AppLayout = () => {

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    const [opened, { toggle }] = useDisclosure(); // this is to toggle nav on mobile devices 


    const appointmenticon = <IconCalendar/>
    const diagnosisicon = <IconClipboardPlus/>
    const prescriptionicon = <IconPill/>
    const homeicon = <IconHome/>

    return (
        <>


            <AppShell padding="md" header={{ height: 60 }} navbar={{width: 300,breakpoint: 'sm',collapsed: { mobile: !opened }}} >
                <AppShell.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    
                        <Title fw={900} order={1}  >BriarWood Medical Centre</Title>
                    
                </AppShell.Header>

                <AppShell.Navbar style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}> 
                {/* logout button */}

                
                <Stack align="center" pt={50}>
                    
                    <Button 
                        
                        onClick={() => navigate(`/app/appointments`)}
                        w={250}
                        justify="center"
                        rightSection = {appointmenticon}>
                        View Appointments
                    </Button>

                    <Button 
                        onClick={() => navigate(`/app/diagnoses`)}
                        w={250}
                        justify="center"
                        rightSection={diagnosisicon}>
                        View Diagnoses
                    </Button>



                    <Button 
                        onClick={() => navigate(`/app/prescriptions`)}
                        w={250}
                        justify="center"
                        rightSection={prescriptionicon}>
                        View Prescriptions 
                    </Button>

                    <Button 
                        onClick={() => navigate(`/app/home`)}
                        w={250}
                        justify="center"
                        rightSection={homeicon}>
                        Home
                    </Button>

                    {token && (
                            <Button color='red' variant={'outline'} w={250} onClick={() => {
                                logout();
                                navigate('/login', { replace: true })
                            }}>Logout</Button>)}

                </Stack>

                <Divider></Divider>

                <img src={image}></img>

                <Divider></Divider>


                </AppShell.Navbar>


                <AppShell.Main>
                    <Outlet/>
                </AppShell.Main>

            </AppShell>
        
        
        </>
    )
}


export default AppLayout;