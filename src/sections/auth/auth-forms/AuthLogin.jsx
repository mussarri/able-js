'use client';

import { useState } from 'react';

import Grid from '@mui/material/Grid';

// assets
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
