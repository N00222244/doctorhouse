import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { Select, TextInput } from "@mantine/core";
import { useForm  } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useParams } from "react-router-dom";






const EditDoctor = () => {





   const navigate = useNavigate();
    const { token } = useAuth();
    const {id} = useParams();
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
        specialisation: 'General Practitioner'
        },
         validate: {
            first_name: (value) => value.length > 2 && value.length < 255 ? null : 'First name must be between 2 and 255 characters',
            last_name: (value) => value.length > 2 && value.length < 255 ? null : 'Last name must be between 2 and 255 characters',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'), // regex for validating an email address
            phone: (value) => value.length === 10 ? null : 'Phone number must be 10 digits'
        },
    });



    // firstly i grabbed the doctors id using a get method
    // then i send a patch request to edit the doctor that was got within the inital request


    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res)
                // Making a request to get info on festivals/{id}
                // Then set our form data using that, so our fields get pre-populated              
                form.setValues(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])


    const handleSubmit = () => {
        

        
        console.log('Token value:', token); 
        // sends a post request to the api url with the form data
        axios.patch(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, form.values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        
        .then((res) => { //after this request
            console.log(res); //logs response data to console to verify 
            navigate(`/app/doctors/${id}`, { relative: 'path', replace: true })

            showNotification({
                title: 'Doctor Edited Succesfully',
                message: `Doctor ${res.data.first_name} ${res.data.last_name} created.`,
                color: 'green',
                autoClose: 7000
                
            });

            
        })
        .catch((err) =>{ // catch any erros and log them to the console
            console.log(err);

            


        

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

            <form onSubmit={form.onSubmit(handleSubmit)}>

                
                <TextInput  type='text'  {...form.getInputProps('first_name')}  name="first_name"  placeholder="Enter First name" ></TextInput>
                <TextInput   type='text'  {...form.getInputProps('last_name')} name="last_name" placeholder="Enter Last name" ></TextInput>
                <TextInput   type='email' {...form.getInputProps('email')} name="email" placeholder="Enter Email"></TextInput>
                <TextInput  type='phone' {...form.getInputProps('phone')} name="phone" placeholder="Enter Phone"></TextInput>
               
                {/* this is a mantine component that uses a select box to provide users with the only possible options for
                 the specilisation, it maps the values from the predefined specialisation arry that defined from above */}
                {/* <select name='specialisation' label="Specialisation" placeholder="Pick one" 
                data={specialisations.map(specialisation => ({ value: specialisation, label: specialisation }))} 
                {...form.getInputProps('specialisation')} />  */}

                

                <div>
                    <label htmlFor="specialisation-select">Specialisation</label>
                    <select
                        id="specialisation-select" // Use an ID for the label to link
                        value={form.values.specialisation} // Controlled by form.values
                        onChange={(e) => form.setFieldValue('specialisation', e.target.value)} // Updates form state
                        // No need for name or {...form.getInputProps('specialisation')} here
                    >
                        {/* Optionally, add a disabled default option if "Pick one" isn't a valid value */}
                        {/* <option value="" disabled>Pick one</option> */}
                        {specialisations.map((specialisation) => (
                            <option key={specialisation} value={specialisation}>
                                {specialisation}
                            </option>
                        ))}
                    </select>
                </div>

                
                


                
                {/* <input onChange={handleChange} value={form.specialisation} type='specialisation' name="specialisation" placeholder="Enter your specialisation"></input> */}
                <button type="submit">Submit</button>
                
            </form>


        </div>
    )
}

export default EditDoctor

