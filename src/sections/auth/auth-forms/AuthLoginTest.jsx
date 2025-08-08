'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// next
import Link from 'next/link';
import Image from 'next/legacy/image';
import { useSession, signIn } from 'next-auth/react';

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
import { Formik, FieldArray, Field } from 'formik';

// project-imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import FirebaseSocial from './FirebaseSocial';
import { fetcher } from 'utils/axios';
import { APP_DEFAULT_PATH } from 'config';

// assets
import { Eye, EyeSlash } from '@wandersonalwes/iconsax-react';
import { preload } from 'swr';
import { Autocomplete, CardMedia } from '@mui/material';
import countries from 'utils/countries';
import OtpInput from 'react-otp-input';
import TextField from '@mui/material/TextField';

const Auth0 = '/assets/images/icons/auth0.svg';
const Cognito = '/assets/images/icons/aws-cognito.svg';
const Google = '/assets/images/icons/google.svg';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ providers, csrfToken }) {
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: 'info@phoenixcoded.co',
          password: '123456',
          submit: null,
          gsm: '',
          country: '+90'
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email zorunludur'),
          password: Yup.string()
            .required('Password zorunludur')
            .test('no-leading-trailing-whitespace', 'Sifrede bosluk olamaz', (value) => value === value.trim())
            .max(10, 'Password must be less than 10 characters'),
          gsm: Yup.string()
            .required('GSM zorunludur')
            .test('no-leading-trailing-whitespace', 'GSM numarasunda bosluk olamaz', (value) => value === value.trim()),
          country: Yup.string().required('Ülke kodu seçiniz')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const trimmedEmail = values.email.trim();
            const result = await signIn('login', { redirect: false, email: trimmedEmail, password: values.password });
            if (result?.error) {
              setStatus({ success: false });
              setErrors({ submit: result.error });
            } else {
              setStatus({ success: true });
              setSubmitting(false);
              preload('api/menu/dashboard', fetcher); // load menu on login success
            }
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, setFieldValue, handleChange, handleSubmit, isSubmitting, touched, values }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Grid container spacing={3}>
                <Grid size={12}>
                  {/* {values.country !== '+90' && (
                    <Typography fontSize={13} sx={{ mb: 5 }} color={'textSecondary'}>
                      Türkiye üzerinden yapılacak üyeliklerin onayı Whatsapp üzerinden yapılmaktadır.Lütfen aşağıya Whatsapp numaranızı
                      yazınız.
                    </Typography>
                  )} */}
                  <Stack sx={{ gap: 1 }}>
                    <Stack direction="row" sx={{ gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack sx={{ gap: 0 }}>
                        <Autocomplete
                          id="country"
                          fullWidth
                          disableClearable
                          onBlur={handleBlur}
                          value={countries.find((item) => item.phone === values.country) || null}
                          onChange={(_, newValue) => {
                            // Backend'e göndereceğin değer: telefon kodu

                            setFieldValue('country', newValue ? newValue.phone : '');
                          }}
                          options={countries}
                          autoHighlight
                          isOptionEqualToValue={(option, value) => option.code === value?.code}
                          getOptionLabel={(option) => `${option.phone}`}
                          renderOption={(props, option) => (
                            <Box key={option.code} component="li" sx={{ '& > img': { mr: 1, flexShrink: 0 } }} {...props}>
                              {option.code && (
                                <CardMedia
                                  component="img"
                                  loading="lazy"
                                  sx={{ width: 20 }}
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  alt="country"
                                />
                              )}
                              {option.code && `${option.phone}`}
                            </Box>
                          )}
                          renderInput={(params) => {
                            return (
                              <TextField
                                {...params}
                                placeholder="Ülke kodu seçiniz"
                                name="country"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.country && errors.country ? 'errors.country' : ''}
                                error={Boolean(touched.country && errors.country)}
                                slotProps={{
                                  htmlInput: {
                                    ...params.inputProps,
                                    autoComplete: 'Ülke kodu seçiniz' // disable autocomplete and autofill
                                  }
                                }}
                              />
                            );
                          }}
                        />
                      </Stack>
                      {values.country === '+90' ? (
                        <OutlinedInput
                          type="text"
                          fullWidth
                          error={Boolean(touched.gsm && errors.gsm)}
                          id="gsm"
                          value={values.gsm}
                          name="gsm"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={'54433322211'}
                        />
                      ) : (
                        <OutlinedInput
                          type="text"
                          fullWidth
                          error={Boolean(touched.gsm && errors.gsm)}
                          id="gsm"
                          value={values.gsm}
                          name="gsm"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={'+01-54433322211'}
                        />
                      )}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={12}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="password-login">Şifre</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? <Eye /> : <EyeSlash />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                  </Stack>
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid sx={{ mt: -1 }} size={12}>
                  <Stack direction="row" sx={{ gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
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
                      label={<Typography variant="h6">Oturumu açık tut</Typography>}
                    />
                    <Links variant="h6" component={Link} href={session ? '/auth/forgot-password' : '/forgot-password'} color="text.primary">
                      Şifremi Unuttum?
                    </Links>
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid size={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid size={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Giriş Yap
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>

      {/* {providers && (
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          justifyContent={{ xs: 'space-around', sm: 'space-between' }}
          sx={{ mt: 3, '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } } }}
        >
          {Object.values(providers).map((provider) => {
            if (provider.id === 'login' || provider.id === 'register') {
              return;
            }

            return (
              <Box key={provider.name} sx={{ width: '100%' }}>
                <Divider sx={{ mt: 2 }}>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
                {provider.id === 'google' && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth={!downSM}
                    startIcon={<Image src={Google} alt="Twitter" width={16} height={16} />}
                    onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}
                  >
                    {!downSM && 'Google'}
                  </Button>
                )}
                {provider.id === 'auth0' && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth={!downSM}
                    startIcon={<Image src={Auth0} alt="Twitter" width={16} height={16} />}
                    onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}
                  >
                    {!downSM && 'Auth0'}
                  </Button>
                )}
                {provider.id === 'cognito' && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth={!downSM}
                    startIcon={<Image src={Cognito} alt="Twitter" width={16} height={16} />}
                    onClick={() => signIn(provider.id, { callbackUrl: APP_DEFAULT_PATH })}
                  >
                    {!downSM && 'Cognito'}
                  </Button>
                )}
              </Box>
            );
          })}
        </Stack>
      )}
      {!providers && (
        <Box sx={{ mt: 3 }}>
          <FirebaseSocial />
        </Box>
      )} */}
    </>
  );
}

AuthLogin.propTypes = { providers: PropTypes.any, csrfToken: PropTypes.any };
