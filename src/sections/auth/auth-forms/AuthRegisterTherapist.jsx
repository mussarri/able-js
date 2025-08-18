'use client';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

// next
import Image from 'next/legacy/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import countries from 'utils/countries';
import OtpInput from 'react-otp-input';
// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import FirebaseSocial from './FirebaseSocial';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { APP_DEFAULT_PATH } from 'config';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { Eye, EyeSlash, Flag, Flag2, Whatsapp } from '@wandersonalwes/iconsax-react';
import { Autocomplete, CardMedia, Checkbox, FormControlLabel, MenuItem, Select, TextField } from '@mui/material';
import { FlagCircleRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Step0, Step1, Step2, Step3 } from './RegisterFields';

const Auth0 = '/assets/images/icons/auth0.svg';
const Cognito = '/assets/images/icons/aws-cognito.svg';
const Google = '/assets/images/icons/google.svg';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [step, setStep] = useState(0);

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {step == 0 && <Step0 setStep={setStep} client={false} />}

          {step == 1 && <Step1 setStep={setStep} />}

          {step === 2 && <Step2 setStep={setStep} />}

          {step === 3 && <Step3 setStep={setStep} />}
        </Grid>
      </form>
    </>
  );
}

AuthRegister.propTypes = { providers: PropTypes.any, csrfToken: PropTypes.any };
