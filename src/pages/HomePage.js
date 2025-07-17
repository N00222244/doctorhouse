import { Button, SimpleGrid } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";



const HomePage = () =>{

    const navigate = useNavigate();
    const {logout, token} = useAuth();
    
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

            <h1>This is the mf homepage bitch the login worked</h1>
            <h2>Docotrs</h2>


            <SimpleGrid cols={3}>


            {/* checks if there are doctors then maps each doctor in the array and displays them as designed within the return statement */}
            {
                doctors && doctors.map((doctor) =>{


                    return (

                        <div>

                            



                        <div className="doctors">

                        <h1>Doctors </h1>    

                        <h2>Dr {doctor.first_name}{doctor.last_name}</h2>
                      

                        </div>

                        </div>

                    )
                        

                })
            }


            </SimpleGrid>


            



        {/* logout button */}
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

