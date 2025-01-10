import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { toast } from "react-toastify";
import { useNavigate, useNavigation } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Profile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setProfile({    //for getting already existing value
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        address: user?.address,
      });
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = errorHandler(profile, errors);
    if (isValid) {
      try {
        setLoading(true);
        console.log(profile);  //for update data to backend path
        let res = await fetch(`${BASE_URL}/profile/update1`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profile),
        });

        const data = await res.json();
        sessionStorage.setItem('user', JSON.stringify(data.data));

        if (res.ok) {
         toast.success('Profile updated successfully');
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      } 
    }
  };

  const errorHandler = (values, errors) => {
    const updatedErrors = { ...errors };
    Object.keys(values).forEach((key) => {
      if (values[key] === '') {
        updatedErrors[key] = 'This field is required';
      } else {
        updatedErrors[key] = '';
      }
    });
    setErrors(updatedErrors);
    return Object.values(updatedErrors).every((value) => value === '');
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, width: '100%' }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          {errors.firstName && (
            <Typography color="error" sx={{ fontSize: '12px' }}>
              {errors.firstName}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          {errors.lastName && (
            <Typography color="error" sx={{ fontSize: '12px' }}>
              {errors.lastName}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            inputProps={{ readOnly: true }}
          />
          {errors.email && (
            <Typography color="error" sx={{ fontSize: '12px' }}>
              {errors.email}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          {errors.address && (
            <Typography color="error" sx={{ fontSize: '12px' }}>
              {errors.address}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ p: 2 }}>
              {loading ? 'Loading...' : 'Update'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;
