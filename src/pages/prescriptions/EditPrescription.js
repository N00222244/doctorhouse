import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { TextInput, NumberInput } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { DatePickerInput } from "@mantine/dates";
import { Select } from "@mantine/core";
import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
 




const EditPrescription = () => {


    const navigate = useNavigate();
    const { token } = useAuth();
    const {id} = useParams();

    const [patients, setPatient] = useState([]);
    const [diagnoses, setDiagnosis] = useState([]);
    const [doctors, setDoctor] = useState([]);
   // console.log("Token before post request is sent:", token); <-- Kept geting 401 error 
   // needed to see what actually was being sent when token was called from use auth
   // turns out the whole object was and forgot to destructure it oopsie daisies



   //added mantine hook instead of using use state to use the helper function getinputprops
    const form = useForm({
        initialValues:{
        patient_id: '',
        doctor_id: '',
        diagnosis_id: '',
        medication: '',
        dosage: '',
        start_date: '',
        end_date : ''
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
            axios.get("https://fed-medical-clinic-api.vercel.app/diagnoses", {
                headers: { Authorization: `Bearer ${token}` },
            }),
        ])
        .then(([doctorsRes, patientsRes, diagnosesRes]) => {
            setDoctor(doctorsRes.data);
            setPatient(patientsRes.data);
            setDiagnosis(diagnosesRes.data);
        })
        .catch((err) => console.error("Error fetching data:", err));
    }, [token]);


    const handleSubmit = (values) => {
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.patch(`https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`, 
            
            {
                doctor_id: Number(values.doctor_id),
                    patient_id: Number(values.patient_id),
                    diagnosis_id: Number(values.diagnosis_id),
                    medication: values.medication,
                    dosage: values.dosage,
                    start_date: values.start_date,
                    end_date: values.end_date,
            }
            , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 
            navigate(`/app/prescriptions/${res.data.id}`, { relative: 'path' })


            const patient = patients.find(patient => patient.id === Number(values.patient_id) )


            showNotification({
                title: 'Prescription Edited Succesfully',
                message: `Prescription for ${patient?.first_name} ${patient?.last_name}  Edited succesfully.`,
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

            <BackButton/>

            <form onSubmit={form.onSubmit(handleSubmit)}>

                <Select label="Doctor" placeholder="Select a doctor" data={doctors.map((doctor) => ({
                        value: String(doctor.id), 
                        label: `Dr. ${doctor.first_name} ${doctor.last_name}`,
                }))} {...form.getInputProps("doctor_id")}/>
                                
                <Select label="Patient" placeholder="Select a patient" data={patients.map((patient) => ({
                        value: String(patient.id), 
                        label: `${patient.first_name} ${patient.last_name}`,
                }))}{...form.getInputProps("patient_id")}/>
                                
                <Select label="diagnoses" placeholder="Select a Condition" data={diagnoses.map((diagnosis) => ({
                        value: String(diagnosis.id), 
                        label: `${diagnosis.condition}`,
                }))}{...form.getInputProps("diagnosis_id")}/>
                

                <TextInput   {...form.getInputProps('medication')}  name="medication"  placeholder="Enter Medication" ></TextInput>
                <TextInput   {...form.getInputProps('dosage')}  name="dosage"  placeholder="Enter Dosage" ></TextInput>
                <DatePickerInput   {...form.getInputProps('start_date')}  name="start_date"  placeholder="Enter Prescription Start Date" ></DatePickerInput>
                <DatePickerInput   {...form.getInputProps('end_date')}  name="end_date"  placeholder="Enter Prescription End Date" ></DatePickerInput>
               
                <button type="submit">Edit Patient</button> 
            </form>


        </div>
    )
}

export default EditPrescription;