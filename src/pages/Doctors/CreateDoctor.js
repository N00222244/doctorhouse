import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { Select, Stack, TextInput, Text, Paper, Container , LoadingOverlay} from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import BackButton from "../../components/BackButton";
import FormBox from "../../components/FormBox";
import { useDisclosure } from '@mantine/hooks';

 




const CreateDocotor = () => {


    const navigate = useNavigate();
    const { token } = useAuth();
   // console.log("Token before post request is sent:", token); <-- Kept geting 401 error 
   // needed to see what actually was being sent when token was called from use auth
   // turns out the whole object was and forgot to destructure it oopsie daisies


   // using mantine hook useDisclosure which provides ability to use open and close handlers based on state basically bolean state managers


    const [opened, handlers] = useDisclosure(false, {
        onOpen: () => console.log('Opened'),
        onClose: () => console.log('Closed'),
    });



   //added mantine hook instead of using use state to use the helper function getinputprops
    const form = useForm({
        initialValues:{
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        specialisation: 'General Practitioner'
        },
         validate: {
            first_name: (value) => value.length > 2 && value.length < 255 ? null : 'First name must be between 2 and 255 characters',
            last_name: (value) => value.length > 2 && value.length < 255 ? null : 'Last name must be between 2 and 255 characters',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'), // regex for validating an email address
            phone: (value) => value.length === 10 ? null : 'Phone number must be 10 digits'
        },
    });


    const handleSubmit = () => {

        handlers.open();
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.post(`https://fed-medical-clinic-api.vercel.app/doctors`, form.values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 
            navigate(`../${res.data.id}`, { relative: 'path' })

            showNotification({
                title: 'Doctor Created Succesfully',
                message: `Doctor ${res.data.first_name} ${res.data.last_name} created.`,
                color: 'green',
                autoClose: 7000
                
            });

            
        })
        .catch((err) =>{ // catch any erros and log them to the console
            
            
            console.log(err);
        })


        .finally(()=> {
            handlers.close();

        });



        

    }


    //<-> this was from the orginal versio of create doctor using use state andhandle change now its using a mantine hook see above
    // const handleChange = (e) => {
    //    setForm(({...form, [e.target.name]: e.target.value})); 
    // } 
    
    

    const specialisations = [
        'Podiatrist',
        'Dermatologist',
        'Pediatrician',
        'Psychiatrist',
        'General Practitioner',
    ]
    
    
    
    
    console.log(specialisations.map(specialisation => ({ value: specialisation, label: specialisation })));
    
    return (
        <div>


            
            <Text>Create a New Doctor</Text>
            <BackButton/>
            
            

            <form onSubmit={form.onSubmit(handleSubmit)}>



            <FormBox>
                
                <Stack>

                    <LoadingOverlay visible={opened}  />

                
                <TextInput  type='text'  {...form.getInputProps('first_name')}  name="first_name"  placeholder="Enter First name" ></TextInput>
                <TextInput   type='text'  {...form.getInputProps('last_name')} name="last_name" placeholder="Enter Last name" ></TextInput>
                <TextInput   type='email' {...form.getInputProps('email')} name="email" placeholder="Enter Email"></TextInput>
                <TextInput  type='phone' {...form.getInputProps('phone')} name="phone" placeholder="Enter Phone"></TextInput>
               
                

                

                <div>
                    <label htmlFor="specialisation-select">Specialisation</label>
                    <select
                        id="specialisation-select" // Use an ID for the label to link
                        value={form.values.specialisation} // Controlled by form.values
                        onChange={(e) => form.setFieldValue('specialisation', e.target.value)} // Updates form state
                        >
                      
                        {specialisations.map((specialisation) => (
                            <option key={specialisation} value={specialisation}>
                                {specialisation}
                            </option>
                        ))}
                    </select>
                </div>

                
                <button  type="submit">Create Docotor</button>

                </Stack>
                        
            </FormBox>
                
            </form>

            


        </div>
    )
}

export default CreateDocotor;