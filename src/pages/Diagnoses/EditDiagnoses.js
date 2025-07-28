import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { TextInput, NumberInput } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { DatePickerInput } from "@mantine/dates";
 




const EditDiagnoses = () => {


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
        condistion: '',
        diagnoses_date: ''
        
        
        },
         validate: {
           
        },
    });


    


    const handleSubmit = () => {
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.patch(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, form.values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 
            navigate(`/app/diagnoses/${res.data.id}`, { relative: 'path' })

            showNotification({
                title: 'Diagnoses Edited Succesfully',
                message: `Diagnoses on ${new Date(res.data.diagnoses_date).toLocaleDateString()}  Edited succesfully.`,
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

                
                <DatePickerInput  {...form.getInputProps('diagnoses_date')}  name="diagnoses_date"  placeholder="Enter Diagnoses Date" ></DatePickerInput>
                <TextInput    {...form.getInputProps('condition')}  name="condition"  placeholder="Enter Condition" ></TextInput>
                <NumberInput   {...form.getInputProps('patient_id')}  name="patient_id"  placeholder="Enter Patient ID" ></NumberInput>
               
                <button type="submit">Edit Diagnoses</button> 
            </form>


        </div>
    )
}

export default EditDiagnoses;