'use client';

import { useChatContext } from '@/context/chatContext';

import {
  and,
  collection,
  getDocs,
  limit,
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
  // hooks
  const { userInfo } = useChatContext();
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
        and(
          where('email', '>=', trimmedDebounceSearchText),
          where('email', '<=', `${trimmedDebounceSearchText}\uf8ff`),
        ),
        limit(10),
      );

      getDocs(querySearchUser).then((querySnapshot) => {
        const users: User[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data() as User;
          if (userData.userId !== userInfo?.userId) {
            users.push(userData);
          }
        });
        setSearchUsers(users);
      });
    };
    handleSearchFirestore();
  }, [trimmedDebounceSearchText, userInfo?.userId]);
  //
  const searchContent = searchUsers ? (
    <Stack spacing={0.5}>
      {searchUsers.map((user) => (
        <SearchUserItem
          key={user.userId}
          user={user}
          handleCloseSearch={handleClearSearchText}
        />
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
