import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
// We don't want the name 'Navbar' to conflict with the Mantine component of the same name
// So we use an alias 'MantineNavbar' to refer to the Mantine component
import { Navbar as MantineNavbar, Button, Stack } from '@mantine/core';





const LandingPage = () => {



    return (
        <div>

            <h1>Princeton Plainsbourough Medical Centre</h1>
            <h2>This software is intended for staff of the current premises if not you piss off</h2>

            <Button variant='filled' component={Link} to='/login' >Login</Button>
            <Button variant='filled' component={Link} to='/register'>Register</Button>

        </div>
    );
};

export default LandingPage;
