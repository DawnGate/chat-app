'use client';

import CTextField from '@/components/CTextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

// third party
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const userScheme = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is not valid' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password contains at least 6 character' }),
});

// types
type UserScheme = z.infer<typeof userScheme>;

// next
import Link from 'next/link';

// hooks
import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';

// images
import Image from 'next/image';

import passwordHideIcon from '@/assets/icons/PasswordHide.svg';
import passwordShowIcon from '@/assets/icons/PasswordShow.svg';

function LoginPage() {
  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserScheme>({
    resolver: zodResolver(userScheme),
  });

  // state
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // events
  const handleOnSubmit = (data: UserScheme) => {
    console.log('hey', data);
  };

  // render
  return (
    <>
      <Typography variant="h5" fontWeight={600} textAlign="center">
        Log in
      </Typography>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Box mt={2}>
          <CTextField
            label="Login with email"
            formId="login-email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            inputBoxProps={{
              autoComplete: 'email',
              register: register('email'),
            }}
          />
        </Box>
        <Box mt={2}>
          <CTextField
            label="Password"
            formId="login-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            inputBoxProps={{
              inputBoxType: showPassword ? 'text' : 'password',
              register: register('password'),
              autoComplete: 'password',
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    position: 'absolute',
                    right: 0,
                  }}
                >
                  <IconButton
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                    disableRipple={true}
                  >
                    <Image
                      priority
                      src={showPassword ? passwordHideIcon : passwordShowIcon}
                      alt="password-toggle-icon"
                      width={24}
                      height={24}
                    />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                '& input.MuiInputBase-input': {
                  paddingRight: 4,
                },
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: 9999,
            mt: 2,
            py: 1.5,
            background: blue[700],
            color: 'white',
            textTransform: 'inherit',
            fontWeight: 600,
            ':hover': {
              background: blue[600],
            },
          }}
          fullWidth
          color="inherit"
          type="submit"
        >
          <Typography variant="body1" fontWeight={600}>
            Log in
          </Typography>
        </Button>
      </form>
      <Typography variant="caption" mt={2}>
        Don't have account yet? <Link href="/sign-up">Join us</Link>
      </Typography>
    </>
  );
}

export default LoginPage;
