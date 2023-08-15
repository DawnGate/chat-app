'use client';

import {
  and,
  collection,
  getDocs,
  limit,
  or,
  query,
  where,
} from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase-config';

import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

import User from '@/models/User';

import { Search, X } from 'react-feather';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { primaryColor } from '@/config/colors';
import { inputTypo } from '@/config/typography';

import SearchUserItem from './SearchUserItem';

function SearchUserBox() {
  // states
  const [searchText, setSearchText] = useState<string>('');
  const debounceSearchText = useDebounce(searchText, 500);
  const trimmedDebounceSearchText = debounceSearchText.trim();

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchUsers, setSearchUsers] = useState<User[] | null>(null);

  // handle events
  const handleChangeSearchText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchText(e.target.value);
  };

  const handleLoseFocus = () => {
    setIsFocus(false);
  };

  const handleClearSearchText = () => {
    setSearchText('');
    handleLoseFocus();
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  // effects
  useEffect(() => {
    const handleSearchFirestore = () => {
      const usersRef = collection(firebaseDb, 'users');

      // check trimmed Search text
      if (!trimmedDebounceSearchText) {
        setSearchUsers(null);
        return;
      }

      const querySearchUser = query(
        usersRef,
        or(
          // query as-is:
          and(
            where('email', '>=', trimmedDebounceSearchText),
            where('email', '<=', `${trimmedDebounceSearchText}\uf8ff`),
          ),
          // capitalize first letter:
          // and(
          //   where(
          //     'name',
          //     '>=',
          //     trimmedSearchText.charAt(0).toUpperCase() +
          //       trimmedSearchText.slice(1),
          //   ),
          //   where(
          //     'name',
          //     '<=',
          //     `${
          //       trimmedSearchText.charAt(0).toUpperCase() +
          //       trimmedSearchText.slice(1)
          //     }\uf8ff`,
          //   ),
          // ),
          // lowercase:
          // and(
          //   where('name', '>=', trimmedSearchText.toLowerCase()),
          //   where('name', '<=', `${trimmedSearchText.toLowerCase()}\uf8ff`),
          // ),
        ),
        limit(10),
      );

      getDocs(querySearchUser).then((querySnapshot) => {
        const users: User[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          users.push({
            id: doc.id,
            displayName: String(userData.displayName),
            email: String(userData.email),
          });
        });
        setSearchUsers(users);
      });
    };
    handleSearchFirestore();
  }, [trimmedDebounceSearchText]);
  //
  const searchContent = searchUsers ? (
    <Stack spacing={0.5}>
      {searchUsers.map((user) => (
        <SearchUserItem user={user} key={user.id} />
      ))}
    </Stack>
  ) : (
    <Typography fontWeight={500}>Enter text to start searching</Typography>
  );

  // content
  return (
    <>
      <TextField
        value={searchText}
        onChange={handleChangeSearchText}
        onFocus={handleFocus}
        placeholder="Search by email"
        autoComplete="off"
        variant="outlined"
        fullWidth
        sx={{
          background: 'white',
          caretColor: primaryColor.main,
          '& fieldset': {
            borderRadius: 3,
          },
          '& input': {
            paddingY: 1,
            textOverflow: 'ellipsis',
            ...inputTypo,
          },
          '& > div': {
            paddingX: 1,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                size="small"
                onClick={handleClearSearchText}
                disabled={Boolean(!isFocus)}
              >
                {isFocus ? <X size={18} /> : <Search size={18} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Collapse in={isFocus}>
        <Box
          sx={{
            mt: 1,
            height: 300,
          }}
        >
          {searchContent}
        </Box>
      </Collapse>
    </>
  );
}

export default SearchUserBox;
