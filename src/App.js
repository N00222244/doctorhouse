//functionality imports 
import { AuthProvider } from "./utils/useAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";



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


const App = () =>{
    return (

        <div>
            <AuthProvider>
                <MantineProvider>
                <Router>

                    <Routes>


                        {/* Landing Page Route */}
                        <Route path="/" element={<LandingPage />} />


                        {/* These Routes are protected and need a valid token to navigated through */}
                        <Route path="/app" element={<ProtectedRoute/>}>
                        
                        


                            <Route path="home" element={<HomePage />} />
                            <Route path="doctors/:id" element={<SingleDoctor/>} />
                            <Route path="doctors/create" element={<CreateDocotor/>}/>



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