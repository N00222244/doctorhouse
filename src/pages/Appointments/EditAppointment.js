import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { TextInput, NumberInput } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { DatePickerInput } from "@mantine/dates";

import { useState, useEffect } from "react";
import { Select } from "@mantine/core";
 




const EditAppointment = () => {


    const navigate = useNavigate();
    const { token } = useAuth();
    const {id} = useParams();

    const [doctors,setDoctors] = useState([]);
    const [patients,setPatients] = useState([]);
   // console.log("Token before post request is sent:", token); <-- Kept geting 401 error 
   // needed to see what actually was being sent when token was called from use auth
   // turns out the whole object was and forgot to destructure it oopsie daisies



   //added mantine hook instead of using use state to use the helper function getinputprops
    const form = useForm({
        initialValues:{
        appointment_date: '',
        doctor_id: '',
        patient_id: ''
        },
         validate: {
           
        },
    });



    useEffect(() => {
        Promise.all([
            axios.get("https://fed-medical-clinic-api.vercel.app/doctors", {
                headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("https://fed-medical-clinic-api.vercel.app/patients", {
                headers: { Authorization: `Bearer ${token}` },
            }),
        ])
            .then(([doctorsRes, patientsRes]) => {
                setDoctors(doctorsRes.data);
                setPatients(patientsRes.data);
            })
            .catch((err) => console.error("Error fetching doctors or patients:", err));
    }, [token]);


    const handleSubmit = (values) => {
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.patch(`https://fed-medical-clinic-api.vercel.app/appointment/${id}`, 
            
            {
                appointment_date: values.appointment_date,
                    doctor_id: Number(values.doctor_id),
                    patient_id: Number(values.patient_id),
            }

            , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 
            navigate(`/app/appointments/${res.data.id}`, { relative: 'path' })

            showNotification({
                title: 'Appointment Edited Succesfully',
                message: `Appointment on ${new Date(res.data.appointment_date).toLocaleDateString()}  Edited succesfully.`,
                color: 'green',
                autoClose: 7000
               
                
            });

            
        })
        .catch((err) =>{ // catch any erros and log them to the console
            console.log(err);

    
        });
    }
    
    return (
        <div>

            <form onSubmit={form.onSubmit(handleSubmit)}>

                
                <DatePickerInput  {...form.getInputProps('appointment_date')}  name="appointment_date"  placeholder="Enter Appointment Date" ></DatePickerInput>
                
                <Select label="Doctor" placeholder="Select a doctor" data={doctors.map((doctor) => ({
                                    value: String(doctor.id), 
                                    label: `Dr. ${doctor.first_name} ${doctor.last_name}`,
                                }))} 
                                {...form.getInputProps("doctor_id")}/>
                
                <Select label="Patient" placeholder="Select a patient" data={patients.map((patient) => ({
                                    value: String(patient.id), 
                                    label: `${patient.first_name} ${patient.last_name}`,
                                }))}
                                {...form.getInputProps("patient_id")}/>
                



                <button type="submit">Edit Appointment</button> 
            </form>


        </div>
    )
}

export default EditAppointment;