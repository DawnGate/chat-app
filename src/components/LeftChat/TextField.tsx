import { Search, X } from 'react-feather';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { primaryColor } from '@/config/colors';
import { inputTypo } from '@/config/typography';

function SearchTextField() {
  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      fullWidth
      sx={{
        background: 'white',
        caretColor: primaryColor,
        '& fieldset': {
          borderRadius: 2,
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
            <IconButton size="small">
              <X size={18} />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Search size={18} />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchTextField;
