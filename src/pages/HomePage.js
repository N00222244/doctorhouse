import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";



const HomePage = () =>{

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    


    return (
        <div>

            <h1>This is the mf homepage bitch the login worked</h1>


            

            {
                    token && (
                        <Button color='red' variant={'outline'} onClick={() => {
                            logout();
                            navigate('/login', { replace: true })
                        }}>Logout</Button>
                    )
                }


        </div>
    )

}

export default HomePage;

