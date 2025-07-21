
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";



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

    
    return doctor && (
        <>

        <h2>Doctor ID: {doctor.id}</h2>
        <h1>Full Name: DR {doctor.first_name} {doctor.last_name}</h1>
        <h2>First Name : {doctor.first_name}</h2>
        <h2>First Name : {doctor.last_name}</h2>
        <h2>Specialisation: {doctor.specialisation}</h2>
        <h2>Email: {doctor.email}</h2>
        <h2>Phone No: + 353 {doctor.phone}</h2>


        <div>Bloody ell its tuesday</div>
        <button onClick={() => navigate(`../doctors/${doctor.id}/edit`)}>Edit Doctor</button>
        
        
        
        </>
    )
}

export default SingleDoctor;