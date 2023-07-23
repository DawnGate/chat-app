'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { FormHelperText } from '@mui/material';

// react
import { ReactNode } from 'react';

const InputBox = styled(InputBase)(({ theme }) => ({
  '&': {
    marginTop: theme.spacing(2.5),
    border: '1px solid',
    borderColor: theme.palette.grey[400],
    borderRadius: '20px',
  },
  '& .MuiInputBase-input': {
    borderRadius: '20px',
    position: 'relative',
    padding: `${theme.spacing(1.25)} ${theme.spacing(2)}`,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
  },
}));

interface Props {
  label: string;
  formId: string;
  helperText?: string;
  error?: boolean;
  inputBoxProps?: {
    register?: any;
  } & InputBaseProps;
}

function CTextField(props: Props) {
  // return
  return (
    <FormControl variant="standard" error={props.error} fullWidth>
      <InputLabel
        shrink
        htmlFor={props.formId}
        sx={{ ml: 2, fontWeight: 'medium' }}
      >
        {props.label}
      </InputLabel>
      <InputBox
        id={props.formId}
        {...props.inputBoxProps?.register}
        {...props.inputBoxProps}
      />
      {props.helperText && (
        <FormHelperText sx={(theme) => ({ textIndent: theme.spacing(2) })}>
          {props.helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default CTextField;
