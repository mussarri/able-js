'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// next
import Link from 'next/link';
import Image from 'next/legacy/image';

import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Links from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// third-party
import * as Yup from 'yup';
import { Formik, FieldArray, Field, Form } from 'formik';

// project-imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { Eye, EyeSlash } from '@wandersonalwes/iconsax-react';
import { preload } from 'swr';
import { useAuth } from 'contexts/AuthContext';
import { Autocomplete, TextField } from '@mui/material';
import countries from 'utils/countries';
import { useRouter } from 'next/navigation';
import { Step0, Step1 } from './LoginFields';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({
    country: '+90',
    gsm: '5303134061',
    password: 'Kg31728581!'
  });
  return (
    <>
      <Grid container spacing={3}>
        {step == 0 && <Step0 setStep={setStep} values={values} setValues={setValues} />}

        {step == 1 && <Step1 setStep={setStep} values={values} setValues={setValues} />}
      </Grid>
    </>
  );
}
