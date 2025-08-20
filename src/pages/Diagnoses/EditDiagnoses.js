import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { TextInput, NumberInput, Select, Stack } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { DatePickerInput } from "@mantine/dates";
import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import FormBox from "../../components/FormBox";




const EditDiagnoses = () => {


    const navigate = useNavigate();
    const { token } = useAuth();
    const {id} = useParams();
    const [patients, setPatients] = useState([]);
   // console.log("Token before post request is sent:", token); <-- Kept geting 401 error 
   // needed to see what actually was being sent when token was called from use auth
   // turns out the whole object was and forgot to destructure it oopsie daisies



   //added mantine hook instead of using use state to use the helper function getinputprops
    const form = useForm({
        initialValues:{
        patient_id: '',
        condition: '',
        diagnosis_date: ''
        
        
        },
         validate: {
            patient_id: (value) => (value ? null : "Patient selection is required"),
            condition: (value) => (value ? null : "Medication is required"),
            diagnosis_date: (value) => (value ? null : "startdate is required"),
           
        },
    });

    useEffect(() => {
        Promise.all([
            
            axios.get("https://fed-medical-clinic-api.vercel.app/patients", {
                headers: { Authorization: `Bearer ${token}` },
            }),
        ])
            .then(([ patientsRes]) => {
                
                setPatients(patientsRes.data);
            })
            .catch((err) => console.error("Error fetching patients:", err));
    }, [token]);


    


    const handleSubmit = (values) => {
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.patch(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, 
            
            {
                patient_id: Number(values.patient_id),
                diagnosis_date: values.diagnosis_date,
                condition: values.condition
            }
            , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 
            navigate(`/app/diagnoses/${res.data.id}`, { relative: 'path' })


            // this loops through the array of patients to give a more personalised and easily read notification to the user
            const patient = patients.find(patient => patient.id === Number(values.patient_id) )

            showNotification({
                title: 'Diagnoses Edited Succesfully',
                message: `Diagnosis for ${patient?.first_name} ${patient?.last_name} Edited succesfully.`,
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

                <FormBox>

                    <Stack>

                
                <DatePickerInput  {...form.getInputProps('diagnosis_date')}  name="diagnosis_date"  placeholder="Enter Diagnosis Date" ></DatePickerInput>
                <TextInput    {...form.getInputProps('condition')}  name="condition"  placeholder="Enter Condition" ></TextInput>
                <Select label="Patient" placeholder="Select a patient" 
                data={patients.map((patient) => ({
                        value: String(patient.id), 
                        label: `${patient.first_name} ${patient.last_name}`,
                    }))}{...form.getInputProps("patient_id")}/>
               
                <button type="submit">Edit Diagnoses</button> 

                    </Stack>

                </FormBox>
            </form>


        </div>
    )
}

export default EditDiagnoses;