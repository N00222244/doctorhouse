import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { TextInput, NumberInput, Divider } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { DatePickerInput } from "@mantine/dates";
 




const CreateDiagnoses = () => {


    const navigate = useNavigate();
    const { token } = useAuth();
   // console.log("Token before post request is sent:", token); <-- Kept geting 401 error 
   // needed to see what actually was being sent when token was called from use auth
   // turns out the whole object was and forgot to destructure it oopsie daisies



   //added mantine hook instead of using use state to use the helper function getinputprops
    const form = useForm({
        initialValues:{
        patient_id: '',
        condistion: '',
        diagnosis_date: ''
        },
         validate: {
           
        },
    });


    const handleSubmit = () => {
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.post(`https://fed-medical-clinic-api.vercel.app/diagnoses`, form.values, {
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

            <form onSubmit={form.onSubmit(handleSubmit)}>

                
                <NumberInput    {...form.getInputProps('patient_id')}  name="patient_id"  placeholder="Enter Patient ID" ></NumberInput>
                <TextInput   {...form.getInputProps('condition')}  name="condition"  placeholder="Enter Condition" ></TextInput>
                <DatePickerInput   {...form.getInputProps('diagnosis_date')}  name="diagnosis_date"  placeholder="Enter Diagnosis Date" ></DatePickerInput>
                
                

                <Divider></Divider>

                
               
                <button type="submit">Create Diagnosis</button> 
            </form>


        </div>
    )
}

export default CreateDiagnoses;