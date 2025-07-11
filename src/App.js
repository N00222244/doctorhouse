//functionality imports 
import { AuthProvider } from "./utils/useAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// component imports

import LoginForm from "./components/LoginForm";


//page imports 

const App = () =>{
    return (

        <div>
            <AuthProvider>
                <Router>

                    <Routes>

                        <Route path="/" element={<LoginForm />} />
                    </Routes>


                </Router>
            </AuthProvider>
        </div>
    )

}

export default App;