import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { TextInput, NumberInput } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { DatePickerInput } from "@mantine/dates";
 




const EditPrescription = () => {


    const navigate = useNavigate();
    const { token } = useAuth();
    const {id} = useParams();
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


    const handleSubmit = () => {
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.patch(`https://fed-medical-clinic-api.vercel.app/prescription/${id}`, form.values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 
            navigate(`/app/prescriptions/${res.data.id}`, { relative: 'path' })

            showNotification({
                title: 'Prescription Edited Succesfully',
                message: `Prescription for ${res.data.patient_id}  Edited succesfully.`,
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
                <NumberInput   {...form.getInputProps('doctor_id')}  name="doctor_id"  placeholder="Enter Docotor ID " ></NumberInput>
                <NumberInput   {...form.getInputProps('diagnosis_id')}  name="diagnosis_id"  placeholder="Enter Diagnosis ID " ></NumberInput>
                <TextInput   {...form.getInputProps('medication')}  name="medication"  placeholder="Enter Medication" ></TextInput>
                <TextInput   {...form.getInputProps('dosage')}  name="dosage"  placeholder="Enter Dosage" ></TextInput>
                <DatePickerInput   {...form.getInputProps('start_date')}  name="start_date"  placeholder="Enter Prescription Start Date" ></DatePickerInput>
                <DatePickerInput   {...form.getInputProps('end_date')}  name="end_date"  placeholder="Enter Prescription End Date" ></DatePickerInput>
               
                <button type="submit">Create Patient</button> 
            </form>


        </div>
    )
}

export default EditPrescription;