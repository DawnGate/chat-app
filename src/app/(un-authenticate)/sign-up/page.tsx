'use client';

// next
import Link from 'next/link';
import Image from 'next/image';

// firebase
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firebaseDb } from '@/lib/firebase-config';

// react
import { useState } from 'react';

// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

// components
import CTextField from '@/components/CTextField';

// colors
import { blue } from '@mui/material/colors';

// icons
import passwordHideIcon from '@/assets/icons/PasswordHide.svg';
import passwordShowIcon from '@/assets/icons/PasswordShow.svg';

// third party
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

// hooks
import { useRouter } from 'next/navigation';

const userScheme = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Email is not valid' }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: 'New password is required' })
      .min(6, { message: 'Password contains at least 6 character' }),
    confirmNewPassword: z
      .string()
      .trim()
      .min(1, { message: 'Confirm new password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'New password and confirm password not match',
  });

// types
type UserScheme = z.infer<typeof userScheme>;

function SignUp() {
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
  // local state
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // events
  const handleOnSubmit: SubmitHandler<UserScheme> = (data) => {
    createUserWithEmailAndPassword(firebaseAuth, data.email, data.newPassword)
      .then((userCredential) => {
        if (!userCredential) {
          return;
        }

        // add new user to database
        const createNewUser = setDoc(
          doc(firebaseDb, 'users', userCredential.user.uid),
          {
            email: data.email,
            displayName: data.email.split('@')[0],
            createdAt: serverTimestamp(),
          },
        );
        const createNewUserChat = setDoc(
          doc(firebaseDb, 'usersChat', userCredential.user.uid),
          {
            email: data.email,
            chats: [],
          },
        );
        Promise.all([createNewUser, createNewUserChat])
          .then(() => {
            userCredential.user.getIdToken().then((userJwtToken) => {
              fetch('/api/login', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${userJwtToken}`,
                },
              }).then((loginRes) => {
                if (loginRes.status === 200) {
                  router.push('/chat');
                }
              });
            });
          })
          .catch((err) => {
            console.log('error', err);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('email', { message: 'email in use in another account' });
        } else {
          setError('email', { message: 'Some thing error has occur' });
        }
      });
  };

  // render
  return (
    <>
      <Typography variant="h5" fontWeight={600} textAlign="center">
        Create new account
      </Typography>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Box mt={2}>
          <CTextField
            label="Email address"
            formId="sign-up-email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
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
            label="New password"
            formId="sign-up-new-password"
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword?.message}
            inputBoxProps={{
              type: showPassword ? 'text' : 'password',
              register: register('newPassword'),
              autoComplete: 'new-password',
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
                      width={20}
                      height={20}
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
        <Box mt={2}>
          <CTextField
            label="Confirm new password"
            formId="sign-up-confirm-new-password"
            error={Boolean(errors.confirmNewPassword)}
            helperText={errors.confirmNewPassword?.message}
            inputBoxProps={{
              type: showConfirmPassword ? 'text' : 'password',
              register: register('confirmNewPassword'),
              autoComplete: 'new-password',
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
                      setShowConfirmPassword((prev) => !prev);
                    }}
                    disableRipple
                  >
                    <Image
                      priority
                      src={
                        showConfirmPassword
                          ? passwordHideIcon
                          : passwordShowIcon
                      }
                      alt="confirm-password-toggle-icon"
                      width={20}
                      height={20}
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
            Sign up now
          </Typography>
        </Button>
      </form>
      <Typography variant="caption" mt={2}>
        Already have account? <Link href="/login">Log in</Link>
      </Typography>
    </>
  );
}

export default SignUp;
