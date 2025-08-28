'use client';

// next
import { useRouter } from 'next/navigation';

import countries from 'utils/countries';
import { VerifyPhone } from './RegisterFields';
import { useState } from 'react';
import { EnterPhone, SetPasswordForForgot } from './ForgotFields';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

export default function AuthForgotPassword() {
  const router = useRouter();
  const [values, setValues] = useState({
    gsm: '',
    country: '+90'
  });
  const [step, setStep] = useState(0);

  return (
    <>
      {step == 0 && <EnterPhone next={() => setStep(1)} values={values} setValues={setValues} />}
      {step == 1 && <VerifyPhone next={() => setStep(2)} country={values.country} gsm={values.gsm} purpose={2} />}

      {step == 2 && <SetPasswordForForgot country={values.country} gsm={values.gsm} />}
    </>
  );
}
