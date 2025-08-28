'use client';

import { useEffect, useState } from 'react';

// next

import Grid from '@mui/material/Grid';

// third-party
import * as Yup from 'yup';

// project-imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { APP_DEFAULT_PATH } from 'config';

// assets
import { Step0, Step1, Step2, Step3 } from './RegisterFields';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [step, setStep] = useState(0);
  const searchParams = useSearchParams();

  return (
    <Grid container spacing={3}>
      {step == 0 && <Step0 setStep={setStep} client={false} />}

      {step == 1 && <Step1 setStep={setStep} />}

      {step === 2 && <Step2 setStep={setStep} />}

      {step === 3 && <Step3 setStep={setStep} />}
    </Grid>
  );
}
