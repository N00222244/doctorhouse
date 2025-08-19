


import { Box, Stack, Paper, Container } from "@mantine/core";
import { Children } from "react";

const FormBox = ({children}) => {



    return (
        <>

        
            <Container style={{ border: "1px solid black",  padding: "20px", }}>
                

                    {children}
               
            </Container>
        
        
        </>
    )
}

export default FormBox;