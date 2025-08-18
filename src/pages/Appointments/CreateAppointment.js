import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { TextInput, NumberInput, Divider } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

import { Select } from "@mantine/core";

 




const CreateAppointment = () => {


    const navigate = useNavigate();
    const { token } = useAuth();

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    
    
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



    // Fetch doctor id and patient Id for the dropdowns whne creating an appointment to streamline creation.


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
        

        
        //console.log('Token value:', token); 


        

        // sends a post request to the api url with the form data
        axios.post(`https://fed-medical-clinic-api.vercel.app/appointments`, 
            {
                appointment_date: values.appointment_date,
                    doctor_id: Number(values.doctor_id),
                    patient_id: Number(values.patient_id),
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 
            navigate(`../${res.data.id}`, { relative: 'path' })


            const patient = patients.find(patient => patient.id === Number(values.patient_id) )


            showNotification({
                title: 'Appointment Created Succesfully',
                message: `Appointment for ${patient?.first_name} ${patient?.last_name}  booked succesfully.`,
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

                
                <DatePickerInput   {...form.getInputProps('appointment_date')}  name="appointment_date"  placeholder="Enter Appointment Date" ></DatePickerInput>
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

                <Divider></Divider>

                
               
                <button type="submit">Create Appointment</button> 
            </form>


        </div>
    )
}

export default CreateAppointment;