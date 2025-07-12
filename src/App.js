//functionality imports 
import { AuthProvider } from "./utils/useAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



// component imports

import LoginForm from "./components/LoginForm";
import LandingPage from "./pages/LandingPage";
import RegisterForm from "./components/RegisterForm";
import { MantineProvider } from "@mantine/core";


//page imports 

const App = () =>{
    return (

        <div>
            <AuthProvider>
                <MantineProvider>
                <Router>

                    <Routes>

                        <Route path="/" element={<LandingPage />} />

                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                    </Routes>


                </Router>
                </MantineProvider>
            </AuthProvider>
        </div>
    )

}

export default App;