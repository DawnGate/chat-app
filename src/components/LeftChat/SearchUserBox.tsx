'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

import { Globe, Search, X } from 'react-feather';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

import { primaryColor, textColor } from '@/config/colors';
import { inputTypo } from '@/config/typography';

import ContentBox from './ContentBox';

function SearchUserBox() {
  // states
  const [searchText, setSearchText] = useState<string>('');
  const debounceSearchText = useDebounce(searchText, 500);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  // handle events
  const handleChangeSearchText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchText(e.target.value);
  };

  const handleClearSearchText = () => {
    setSearchText('');
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleLoseFocus = () => {
    setIsFocus(false);
  };

  // effects
  useEffect(() => {
    console.log(debounceSearchText);
  }, [debounceSearchText]);

  // content
  return (
    <>
      <TextField
        value={searchText}
        onChange={handleChangeSearchText}
        onFocus={handleFocus}
        onBlur={handleLoseFocus}
        placeholder="Search"
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
                disabled={Boolean(!searchText)}
              >
                {searchText ? <X size={18} /> : <Search size={18} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Collapse in>
        <Box
          sx={{
            mt: 1,
            height: 300,
          }}
        >
          <ContentBox
            title="global search"
            icon={<Globe size={14} color={textColor.lighter} />}
          >
            Hello
          </ContentBox>
        </Box>
      </Collapse>
    </>
  );
}

export default SearchUserBox;
