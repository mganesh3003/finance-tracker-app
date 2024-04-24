import React, { useState } from 'react';
import { TextField, Button, styled, Typography } from '@mui/material';
import usersData from '../../../public/users.json';
import logoImage from '../../assets/expense-tracker-logo.png';

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '90vh',
  padding: '20px',
  backgroundColor: '#FFFFFF',
});

const StyledForm = styled('form')({
  width: '100%',
  maxWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledTextField = styled(TextField)({
  marginBottom: '10px',
  width: '100%',
});

const StyledButton = styled(Button)({
  width: '100%',
  marginBottom: '10px',
});

const ErrorMessage = styled('div')({
  color: '#FF0000',
  marginBottom: '10px',
});

const StyledImage = styled('img')({
  width: '100px',
  height: 'auto',
  borderRadius: '50%',
});

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = usersData.users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      onLogin(username);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <StyledContainer>
      <StyledImage src={logoImage} alt="Logo" />
      <Typography variant="h4" mb={3}>
        Login to Finance Tracker
      </Typography>
      <StyledForm onSubmit={handleLogin}>
        <StyledTextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton variant="contained" type="submit">
          Login
        </StyledButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;