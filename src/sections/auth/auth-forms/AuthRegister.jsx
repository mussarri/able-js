'use client';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

// next
import Image from 'next/legacy/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
import { Eye, EyeSlash } from '@wandersonalwes/iconsax-react';
import { Checkbox, FormControlLabel, MenuItem, Select, TextField } from '@mui/material';

const Auth0 = '/assets/images/icons/auth0.svg';
const Cognito = '/assets/images/icons/aws-cognito.svg';
const Google = '/assets/images/icons/google.svg';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister({ providers, csrfToken }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const [step, setStep] = useState(0);

  return (
    <>
      <Formik
        initialValues={{
          rumuz: '',
          gsm: '',
          password: '',
          countryCode: '+90',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          rumuz: Yup.string().max(255).required('Rumuz zorunludur'),
          gsm: Yup.string().max(255).required('Gsm zorunludur'),
          countryCode: Yup.string().max(255).required('Ulke kodu zorunludur'),
          password: Yup.string()
            .required('Şifre zorunludur')
            .test('no-leading-trailing-whitespace', 'Şifre boşluk içermemelidir', (value) => value === value.trim())
            .max(10, 'Şifre en fazla 10 karakter olabilir')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          signIn('register', {
            redirect: false,
            rumuz: values.rumuz,
            password: values.password,
            gsm: values.gsm,
            countryCode: values.countryCode
          }).then((res) => {
            if (res?.error) {
              setErrors({ submit: res.error });
              setSubmitting(false);
            } else if (res?.url) {
              router.push(res?.url);
            }
          });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Grid container spacing={3}>
              {step === 0 && (
                <Grid size={12}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="rumuz-signup">Rumuz*</InputLabel>
                    <OutlinedInput
                      id="rumuz-signup"
                      type="text"
                      value={values.rumuz}
                      name="rumuz"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="John"
                      fullWidth
                      error={Boolean(touched.rumuz && errors.rumuz)}
                    />
                    {touched.rumuz && errors.rumuz && <FormHelperText error>{errors.rumuz}</FormHelperText>}
                  </Stack>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => setStep(1)}
                    disabled={!values.rumuz || Boolean(errors.rumuz)}
                  >
                    İleri
                  </Button>
                </Grid>
              )}

              {step == 1 && (
                <Grid size={12}>
                  <InputLabel htmlFor="personal-phone">Telefon No*</InputLabel>
                  <Stack direction="row" sx={{ gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Select value={values.countryCode} name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                      <MenuItem value="+90">+90</MenuItem>
                      <MenuItem value="diger">Diger</MenuItem>
                    </Select>
                    <OutlinedInput
                      type="text"
                      fullWidth
                      error={Boolean(touched.gsm && errors.gsm)}
                      id="gsm"
                      value={values.gsm}
                      name="gsm"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={values.countryCode === 'diger' ? '+01-54433322211' : '54433322211'}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={() => setStep(0)}>
                      Geri
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setStep(2)}
                      disabled={!values.gsm || Boolean(errors.gsm) || !values.countryCode || Boolean(errors.countryCode)}
                    >
                      İleri
                    </Button>
                  </Stack>
                </Grid>
              )}

              {step === 2 && (
                <Grid size={12}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="password-signup">Şifre</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password-signup"
                      type="password"
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="******"
                    />
                    {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                  </Stack>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {' '}
                        <Link component={NextLink} href="/" passHref variant="subtitle2">
                          Kullanıcı sözleşmesini
                        </Link>
                        &nbsp; okudum onaylıyorum &nbsp;
                      </Typography>
                    }
                  />

                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={() => setStep(1)}>
                      Geri
                    </Button>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={!values.password || Boolean(errors.password) || !checked || isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Kayıt Ol
                      </Button>
                    </AnimateButton>
                  </Stack>
                </Grid>
              )}

              {errors.submit && (
                <Grid size={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthRegister.propTypes = { providers: PropTypes.any, csrfToken: PropTypes.any };
