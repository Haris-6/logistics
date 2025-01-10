import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
} from '@mui/material';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Setting() {
  const [profile, setProfile] = useState({
    password: '',
    confirmPassword: '',
  });

  const user = JSON.parse(sessionStorage.getItem('user'));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
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
      if (profile.password !== profile.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/profile/admin/password/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: profile.password,
            email: user.email,
          }),
        });

        if (res.ok) {
          toast.success('Password updated successfully');
          navigate('/');
        } else {
          toast.error('Failed to update password');
        }
      } catch (error) {
        console.error('Error updating password:', error);
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
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
          Change Your Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            name="password"
            label="Password"
            onChange={handleChange}
            value={profile.password}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* Add a visibility toggle icon if desired */}
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {errors.password && (
            <Typography color="error" sx={{ fontSize: '12px' }}>
              {errors.password}
            </Typography>
          )}

          <TextField
            name="confirmPassword"
            label="Confirm Password"
            onChange={handleChange}
            value={profile.confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* Add a visibility toggle icon if desired */}
                </InputAdornment>
              ),
            }}
          />
          {errors.confirmPassword && (
            <Typography color="error" sx={{ fontSize: '12px' }}>
              {errors.confirmPassword}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ p: 2 }}>
              {loading ? 'Loading...' : 'Change Password'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Setting;
