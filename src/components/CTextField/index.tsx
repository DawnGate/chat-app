'use client';

/* eslint-disable react/jsx-props-no-spreading */

// mui
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

// third party
import { UseFormRegisterReturn } from 'react-hook-form';

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
    register?: UseFormRegisterReturn;
  } & InputBaseProps;
}

function CTextField(props: Props) {
  // destructure value
  const { label, formId, helperText, error, inputBoxProps } = props;
  // return

  return (
    <FormControl variant="standard" error={error} fullWidth>
      <InputLabel shrink htmlFor={formId} sx={{ ml: 2, fontWeight: 'medium' }}>
        {label}
      </InputLabel>
      <InputBox id={formId} {...inputBoxProps?.register} {...inputBoxProps} />
      {helperText && (
        <FormHelperText sx={(theme) => ({ textIndent: theme.spacing(2) })}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

CTextField.defaultProps = {
  helperText: '',
  error: false,
  inputBoxProps: {
    register: null,
  },
};

export default CTextField;
