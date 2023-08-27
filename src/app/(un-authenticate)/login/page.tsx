'use client';

// next
import Link from 'next/link';
import Image from 'next/image';

// firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase-config';

// hooks
import { useState } from 'react';

// icons
import passwordHideIcon from '@/assets/icons/PasswordHide.svg';
import passwordShowIcon from '@/assets/icons/PasswordShow.svg';

// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

// colors
import { blue } from '@mui/material/colors';

// components
import CTextField from '@/components/CTextField';

// third party
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

// hooks
import { useRouter } from 'next/navigation';

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

function LoginPage() {
  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserScheme>({
    resolver: zodResolver(userScheme),
  });
  const router = useRouter();

  // state
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // events
  const handleOnSubmit = (data: UserScheme) => {
    setIsLogin(true);
    signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
      .then((userCred) => {
        if (!userCred) {
          return;
        }

        userCred.user.getIdToken().then((userJwtToken) => {
          fetch('/api/login', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${userJwtToken}`,
            },
          }).then((loginRes) => {
            if (loginRes.status === 200) {
              router.refresh();
              router.push('/chat');
            } else {
              setIsLogin(false);
            }
          });
        });
      })
      .catch((err) => {
        const signInError: { [key: string]: string } = {
          'auth/user-not-found':
            'User not existed. Create a new account to continue',
          'auth/wrong-password': 'Email or password not correct',
          default: 'Some thing error has occur',
        };
        if (signInError[err.code]) {
          setError('password', { message: signInError[err.code] });
        } else {
          setError('password', { message: signInError.default });
        }
        setIsLogin(false);
      });
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
            disabled={isLogin}
            inputBoxProps={{
              type: 'email',
              autoComplete: 'email',
              register: register('email'),
              autoFocus: true,
            }}
          />
        </Box>
        <Box mt={2}>
          <CTextField
            label="Password"
            formId="login-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            disabled={isLogin}
            inputBoxProps={{
              type: showPassword ? 'text' : 'password',
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
                    disableRipple
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
          disabled={isLogin}
        >
          {isLogin ? (
            <CircularProgress
              size={24}
              sx={{
                color: 'red',
              }}
            />
          ) : (
            <Typography variant="body1" fontWeight={600}>
              Log in
            </Typography>
          )}
        </Button>
      </form>
      <Typography variant="caption" mt={2}>
        Don't have account yet? <Link href="/sign-up">Join us</Link>
      </Typography>
    </>
  );
}

export default LoginPage;
