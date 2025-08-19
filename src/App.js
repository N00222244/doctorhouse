//functionality imports 
import { AuthProvider } from "./utils/useAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import theme from "./assets/StyleTheme";
import '@fontsource/inter/600.css';



// component imports

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoutes";
import AppLayout from "./components/AppLayout";




//page imports 
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";

//doctor
import SingleDoctor from "./pages/doctors/SingleDoctor";
import CreateDocotor from "./pages/doctors/CreateDoctor";
import EditDoctor from "./pages/doctors/EditDoctor";

//patients
import SinglePatient from "./pages/patients/SinglePatient";
import CreatePatient from "./pages/patients/CreatePatient";
import EditPatient from "./pages/patients/EditPatient";

//appointments
import Appointments from "./pages/Appointments/AllAppointments";
import SingleAppointment from "./pages/Appointments/SingleAppointment";
import CreateAppointment from "./pages/Appointments/CreateAppointment";
import EditAppointment from "./pages/Appointments/EditAppointment";

// diagnoses
import Diagnoses from "./pages/Diagnoses/AllDiagnoses";
import SingleDiagnoses from "./pages/Diagnoses/SingleDiagnosis";
import CreateDiagnoses from "./pages/Diagnoses/CreateDiagnoses";
import EditDiagnoses from "./pages/Diagnoses/EditDiagnoses";

//prescriptions
import Prescriptions from "./pages/prescriptions/AllPrescriptions";
import CreatePrescription from "./pages/prescriptions/CreatePrescription";
import SinglePrescription from "./pages/prescriptions/SinglePrescription";
import EditPrescription from "./pages/prescriptions/EditPrescription";




const App = () =>{
    return (

        <div>
            <AuthProvider>
                <MantineProvider theme={theme} withNormalizeCSS>
                    <Notifications position="bottom-right"  /> 
                <Router>

                    <Routes>


                        {/* Landing Page Route */}
                        <Route path="/" element={<LandingPage />} />
                        {/* Public routes any user can access */}
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        



                        {/* These Routes are protected and need a valid token to navigated through */}
                        <Route path="/app" element={
                            <ProtectedRoute>
                            <AppLayout/>
                            </ProtectedRoute>
                            }>
                        
                        

                            {/* Home Page */}
                            <Route path="home" element={<HomePage />} />
                            {/* Doctors */}
                            <Route path="doctors/:id" element={<SingleDoctor/>} />
                            <Route path="doctors/create" element={<CreateDocotor/>}/>
                            <Route path="doctors/:id/edit" element={<EditDoctor/>} />
                            {/* Patients */}
                            <Route path="patients/:id" element={<SinglePatient/>} />
                            <Route path="patients/create" element={<CreatePatient/>} />
                            <Route path="patients/:id/edit" element={<EditPatient/>} />
                            {/* Appointments */}
                            <Route path="appointments" element={<Appointments/>} />
                            <Route path="appointments/:id" element={<SingleAppointment/>} />
                            <Route path="appointments/create" element={<CreateAppointment/>} />
                            <Route path="appointments/:id/edit" element={<EditAppointment/>} />
                            {/* Diagnoses */}
                            <Route path="diagnoses" element={<Diagnoses/>} />
                            <Route path="diagnoses/:id" element={<SingleDiagnoses/>} />
                            <Route path="diagnoses/create" element={<CreateDiagnoses/>} />
                            <Route path="diagnoses/:id/edit" element={<EditDiagnoses/>} />

                            {/* Prescriptions */}
                            <Route path="prescriptions" element={<Prescriptions/>} />
                            <Route path="prescriptions/create" element={<CreatePrescription/>} />
                            <Route path="prescriptions/:id" element={<SinglePrescription/>} />
                            <Route path="prescriptions/:id/edit" element={<EditPrescription/>} />
                            



                        </Route>



                        
                        
                    </Routes>


                </Router>
                </MantineProvider>
            </AuthProvider>
        </div>
    )

}

export default App;