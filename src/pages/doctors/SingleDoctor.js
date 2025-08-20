
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Divider, Group,Title,Text } from "@mantine/core";
import BackButton from "../../components/BackButton";



const SingleDoctor = () => {


    const {token} = useAuth(); // grab token from useAuth
    const  [doctor, setDoctor] = useState(null); // set the doctors state
    const {id} = useParams(); // grabs id from the url defiend as :id within app.js 
    const navigate = useNavigate();



    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, { // send get reques to url
            headers: {
                Authorization: `Bearer ${token}`, // send this auth header with a bearer token
            },
        }) 
        .then((res) => {
            console.log(res.data); //when succesful log the response data to the console to chekc its there
            setDoctor(res.data); // store data wtihin set docotr to update teh state
        })
        .catch((err) => {
            console.log(err)
        });

    }, [id, token]); // rerun if these variable values change



    const DeleteDoctor = async () => {
    try {
        await axios.delete(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        
        navigate('/app/home');


     } catch (err) { 
         console.error("Error deleting doctor:", err);
     }
    }

    
    return doctor && (
        <>
        <BackButton/>


        <Divider/>

        <Title fw={700} order={2}>Doctor Details</Title>
        <Divider></Divider>

        <Group>
            <Text fw={600} >Doctor ID:</Text>
            <Text fw={400} >{doctor.id}</Text>
        </Group>

        <Group>
            <Text fw={600} >Full Name:</Text>
            <Text fw={400} >DR {doctor.first_name} {doctor.last_name}</Text>
        </Group>

        <Group>
            <Text fw={600} >Specialisation:</Text>
            <Text fw={400} >{doctor.specialisation}</Text>
        </Group>

        

        <Divider/>
        <Title fw={700} order={2}>Contact Information</Title>
        <Divider/>

        <Group>
            <Text fw={600} >Email:</Text>
            <Text fw={400} >{doctor.email}</Text>
        </Group>

        <Group>
            <Text fw={600} >Phone No:</Text>
            <Text fw={400} >+ 353 {doctor.phone}</Text>
        </Group>



        <Divider/>
            <Title fw={700} order={2}>Manage</Title>
        <Divider/>

        <Group pt={20}>
        <Button color="green" onClick={() => navigate(`../doctors/${doctor.id}/edit`)}>Edit Doctor</Button>
        <Button color="red" onClick={DeleteDoctor}>Delete Doctor</Button>
        </Group>
        
        
        
        </>
    )
}

export default SingleDoctor;