//functionality imports 
import { AuthProvider } from "./utils/useAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';




// component imports

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoutes";




//page imports 
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
//doctor
import SingleDoctor from "./pages/doctors/SingleDoctor";
import CreateDocotor from "./pages/doctors/CreateDoctor";
import EditDoctor from "./pages/doctors/EditDoctor";

//patients
import SinglePatient from "./pages/patients/SinglePatient";


const App = () =>{
    return (

        <div>
            <AuthProvider>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                    <Notifications position="bottom-right"  /> 
                <Router>

                    <Routes>


                        {/* Landing Page Route */}
                        <Route path="/" element={<LandingPage />} />


                        {/* These Routes are protected and need a valid token to navigated through */}
                        <Route path="/app" element={<ProtectedRoute/>}>
                        
                        


                            <Route path="home" element={<HomePage />} />
                            <Route path="doctors/:id" element={<SingleDoctor/>} />
                            <Route path="doctors/create" element={<CreateDocotor/>}/>
                            <Route path="doctors/:id/edit" element={<EditDoctor/>} />
                            <Route path="patients/:id" element={<SinglePatient/>} />
                            



                        </Route>



                        {/* Public routes any user can access */}
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