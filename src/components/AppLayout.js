import { Button, SimpleGrid , AppShell, Burger, Divider,Text } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router-dom";








const AppLayout = () => {

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    const [opened, { toggle }] = useDisclosure(); // this is to toggle nav on mobile devices 

    return (
        <>


            <AppShell padding="md" header={{ height: 60 }} navbar={{width: 300,breakpoint: 'sm',collapsed: { mobile: !opened }}} >
                <AppShell.Header>
                     <Text>Princeton Plainsbourough Medical Centre </Text>
                </AppShell.Header>

                <AppShell.Navbar >
                {/* logout button */}
                    {
                        token && (
                            <Button color='red' variant={'outline'} onClick={() => {
                                logout();
                                navigate('/login', { replace: true })
                            }}>Logout</Button>
                                )
                    }
                    <Button onClick={() => navigate(`/app/appointments`)}>View Appointments</Button>
                    <Button onClick={() => navigate(`/app/diagnoses`)}>View Diagnoses</Button>
                    <Button onClick={() => navigate(`/app/prescriptions`)}>View Prescriptions</Button>
                </AppShell.Navbar>


                <AppShell.Main>
                    <Outlet/>
                </AppShell.Main>

            </AppShell>
        
        
        </>
    )
}


export default AppLayout;