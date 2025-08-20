import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import BackButton from "../../components/BackButton";
import FormBox from "../../components/FormBox";




const CreatePatient = () => {


    const navigate = useNavigate();
    const { token } = useAuth();
   // console.log("Token before post request is sent:", token); <-- Kept geting 401 error 
   // needed to see what actually was being sent when token was called from use auth
   // turns out the whole object was and forgot to destructure it oopsie daisies



   //added mantine hook instead of using use state to use the helper function getinputprops
    const form = useForm({
        initialValues:{
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        address: ''
        },
         validate: {
            first_name: (value) => value.length > 2 && value.length < 255 ? null : 'First name must be between 2 and 255 characters',
            last_name: (value) => value.length > 2 && value.length < 255 ? null : 'Last name must be between 2 and 255 characters',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'), // regex for validating an email address
            phone: (value) => value.length === 10 ? null : 'Phone number must be 10 digits',
            address: (value) => value.length > 2 && value.length < 255 ? null : 'address name must be between 2 and 255 characters',
        },
    });


    const handleSubmit = () => {
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.post(`https://fed-medical-clinic-api.vercel.app/patients`, form.values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 
            navigate(`../${res.data.id}`, { relative: 'path' })

            showNotification({
                title: 'Patient Created Succesfully',
                message: `Patient ${res.data.first_name} ${res.data.last_name} created.`,
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

                    

                
                <TextInput  type='text'  {...form.getInputProps('first_name')}  name="first_name"  placeholder="Enter First name" ></TextInput>
                <TextInput   type='text'  {...form.getInputProps('last_name')} name="last_name" placeholder="Enter Last name" ></TextInput>
                <TextInput   type='email' {...form.getInputProps('email')} name="email" placeholder="Enter Email"></TextInput>
                <TextInput  type='phone' {...form.getInputProps('phone')} name="phone" placeholder="Enter Phone"></TextInput>
                <DatePickerInput {...form.getInputProps('date_of_birth')} name="date_of_birth" placeholder="Enter Date of Birth"></DatePickerInput>
                <TextInput  type='address' {...form.getInputProps('address')} name="address" placeholder="Enter Address"></TextInput>
               
                <Button type="submit">Create Patient</Button>

                    </Stack>

                </FormBox> 
            </form>


                
            


        </div>
    )
}

export default CreatePatient;