'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

const InputBox = styled(InputBase)(({ theme }) => ({
  '&': {
    marginTop: theme.spacing(2.5),
  },
  '& .MuiInputBase-input': {
    borderRadius: '9999px',
    position: 'relative',
    border: '1px solid',
    borderColor: theme.palette.grey[400],
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface Props {
  label: string;
  formId: string;
}

const CTextField = (props: Props) => {
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel
        shrink
        htmlFor={props.formId}
        sx={{ ml: 2, fontWeight: 'medium' }}
      >
        {props.label}
      </InputLabel>
      <InputBox id={props.formId} />
    </FormControl>
  );
};

export default CTextField;
