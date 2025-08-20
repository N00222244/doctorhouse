import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { TextInput, NumberInput, Divider, Select, Stack, Autocomplete } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import FormBox from "../../components/FormBox";

 




const CreateDiagnoses = () => {


    const navigate = useNavigate();
    const { token } = useAuth();
    const [patients, setPatients] = useState([]);

    const [conditions, setConditions] = useState([])
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


    // this use effect fetches the data from the clinic table api to date for the autfill box when entering conditions.

    useEffect(()=> {
        // ${(form.values.condition) changes the url by adding whatever is typed within the condition form box
        fetch(`https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${(form.values.condition)}`) 
        
        .then((res) => res.json())
        .then((data) => {
            setConditions(data);
        })

        .catch((err) => console.error("Error Fetching Conditions", err));
    }, [form.values.condition])


    // mantine autcomplete only takes in  string arrays or obejct arrays 
    // api returns json object so need to map condtion names and make it an array of strings
    const conditionNames = conditions[3]?.map(([name]) => name);



     useEffect(() => {
        Promise.all([
            axios.get("https://fed-medical-clinic-api.vercel.app/patients", {
                headers: { Authorization: `Bearer ${token}` },
            }),
        ])
            .then(([ patientsRes]) => {
           
                setPatients(patientsRes.data);
            })
            .catch((err) => console.error("Error fetching doctors or patients:", err));
    }, [token]);


    const handleSubmit = (values) => {
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.post(`https://fed-medical-clinic-api.vercel.app/diagnoses`, 
            
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
            navigate(`../${res.data.id}`, { relative: 'path' })

            showNotification({
                title: 'Diagnosis Created Succesfully',
                message: `${res.data.patient_id}  diagnosis has been added succesfully.`,
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
                
                <Select label="Patient" placeholder="Select a patient" data={patients.map((patient) => ({
                    value: String(patient.id), 
                    label: `${patient.first_name} ${patient.last_name}`,
                }))}
                {...form.getInputProps("patient_id")}/>


                {/* Auto complete box has a data prop which the mapped condtions names is passed in through  */}
                <Autocomplete label="Condition" placeholder="Start typing a condition..." value={form.values.condition} 
                onChange={(val) => form.setFieldValue("condition", val)} data={conditionNames}/>




                
                <DatePickerInput  label="Diagnosis Date" {...form.getInputProps('diagnosis_date')}  name="diagnosis_date"  placeholder="Enter Diagnosis Date" ></DatePickerInput>
                
                

                <Divider></Divider>

                
               
                <button type="submit">Create Diagnosis</button> 
                </Stack>
                </FormBox>
            </form>


        </div>
    )
}

export default CreateDiagnoses;