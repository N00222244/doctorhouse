import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {IconArrowLeft} from '@tabler/icons-react'


// this component is a simple backbutton that returns the user on step 

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconArrowLeft onClick={() => navigate(-1)} />
  );
}

export default BackButton;