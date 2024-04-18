import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { 
  Alert,
  Avatar, 
  Button, 
  CssBaseline, 
  TextField, Container, 
  Typography,
  Box,
  Grid,
  Link
} from '@mui/material';

import { setupDefaultCredentials, validateEmail } from '../../helpers';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setupDefaultCredentials();
  }, []);

  useEffect(() => {
    if (touched.email && !validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (touched.password && !password) {
      setPasswordError('Please enter a valid password');
      return;
    }
    setEmailError('');
    setPasswordError('');
  }, [email, touched, password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storedCredentials = JSON.parse(localStorage.getItem('credentials')!);
    const { defaultEmail, defaultPassword } = storedCredentials;

    if (email !== defaultEmail || password !== defaultPassword) {
      setFormError('Invalid email or password.');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify({ email, password }));
    setFormError('');
    navigate('/list');
  };

  const handleOnChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setTouched(prev => ({ ...prev, email: true }));
  }

  const handleOnChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setTouched(prev => ({ ...prev, password: true }));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleOnChangeEmail}
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            error={!!emailError}
            helperText={emailError}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleOnChangePassword}
            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
            error={!!passwordError}
            helperText={passwordError}
          />

          {formError && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {formError}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}