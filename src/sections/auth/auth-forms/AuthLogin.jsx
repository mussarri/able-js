'use client';

import { useState } from 'react';

import Grid from '@mui/material/Grid';

// assets
import { useRouter } from 'next/navigation';
import { Step0, Step1 } from './LoginFields';
import { VerifyPhone, SetPasswordForLogin, SetUserInfoLogin, EnterPasswordForLogin } from './RegisterFields';
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
        {/* if phone not verified redirect here and resend submit */}
        {step == 2 && <Step2 values={values} />}
        {step == 3 && <Step3 values={values} />}
      </Grid>
    </>
  );
}

function Step2({ values }) {
  const [step, setStep] = useState(0);
  return (
    <>
      {step == 0 && <VerifyPhone next={() => setStep(1)} country={values.country} gsm={values.gsm} purpose={3} />}

      {step == 1 && <SetPasswordForLogin next={() => setStep(2)} country={values.country} gsm={values.gsm} />}

      {step == 2 && <SetUserInfoLogin />}
    </>
  );
}

function Step3({ values }) {
  const [step, setStep] = useState(0);
  return (
    <>
      {step == 0 && <EnterPasswordForLogin next={() => setStep(1)} country={values.country} gsm={values.gsm} />}

      {step == 1 && <SetUserInfoLogin />}
    </>
  );
}
