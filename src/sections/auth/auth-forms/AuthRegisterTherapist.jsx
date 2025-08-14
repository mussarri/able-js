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

const Auth0 = '/assets/images/icons/auth0.svg';
const Cognito = '/assets/images/icons/aws-cognito.svg';
const Google = '/assets/images/icons/google.svg';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister({ providers, csrfToken }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const theme = useTheme();

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
          firstname: '',
          lastname: '',
          gsm: '',
          password: '',
          country: '+90',
          password_repeat: '',
          password: '',
          otp: '',
          avatar: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          rumuz: Yup.string().max(255).required('Rumuz zorunludur'),
          firstname: Yup.string().max(255).required('Isim zorunludur'),
          lastname: Yup.string().max(255).required('Soyisim zorunludur'),
          gsm: Yup.string().max(255).required('Gsm zorunludur'),
          country: Yup.string().max(255).required('Ulke kodu zorunludur'),
          otp: Yup.string().max(6).required('Doğrulama kod zorunludur'),
          password: Yup.string()
            .required('Şifre zorunludur')
            .test('no-leading-trailing-whitespace', 'Şifre boşluk içermemelidir', (value) => value === value.trim())
            .max(10, 'Şifre en fazla 10 karakter olabilir'),
          password_repeat: Yup.string()
            .equals([Yup.ref('password'), null], 'Şifreler eşleşmelidir')
            .required('Şifre tekrarı zorunludur')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          signIn('register', {
            redirect: false,
            rumuz: values.rumuz,
            password: values.password,
            gsm: values.gsm,
            country: values.country
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
        {({ errors, handleBlur, setFieldValue, handleChange, handleSubmit, isSubmitting, touched, values }) => {
          console.log(values);
          const selected = countries.find((c) => c.phone === values.country) || null;
          return (
            <form noValidate onSubmit={handleSubmit}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Grid container spacing={3}>
                {step == 0 && (
                  <Grid size={12}>
                    {values.country !== '+90' && (
                      <Typography fontSize={13} sx={{ mb: 5 }} color={'textSecondary'}>
                        Türkiye üzerinden yapılacak üyeliklerin onayı Whatsapp üzerinden yapılmaktadır.Lütfen aşağıya Whatsapp numaranızı
                        yazınız.
                      </Typography>
                    )}
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
                                  helperText={touched.country && errors.country ? errors.country : ''}
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
                      <Stack direction="row" spacing={2} sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" onClick={() => setStep(0)}>
                          Geri
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => setStep(1)}
                          disabled={!values.gsm || Boolean(errors.gsm) || !values.country || Boolean(errors.country)}
                        >
                          İleri
                        </Button>
                      </Stack>
                    </Stack>
                  </Grid>
                )}

                {step == 1 && (
                  <Grid size={12}>
                    <Stack>
                      <Box
                        sx={(theme) => ({
                          '& input:focus-visible': {
                            outline: 'none !important',
                            borderColor: `${theme.palette.primary.main} !important`,
                            boxShadow: `${theme.customShadows.primary} !important`
                          }
                        })}
                      >
                        <OtpInput
                          value={values.otp}
                          onChange={(otp) => setFieldValue('otp', otp)}
                          inputType="tel"
                          shouldAutoFocus
                          renderInput={(props) => <input {...props} />}
                          numInputs={6}
                          containerStyle={{ justifyContent: 'space-between', margin: -8 }}
                          inputStyle={{
                            width: '100%',
                            margin: '8px',
                            padding: '10px',
                            border: '1px solid',
                            outline: 'none',
                            borderRadius: 4,
                            borderColor: touched.otp && errors.otp ? theme.palette.error.main : theme.palette.divider
                          }}
                        />
                        {touched.otp && errors.otp && (
                          <FormHelperText error id="standard-weight-helper-text-otp">
                            {errors.otp}
                          </FormHelperText>
                        )}
                      </Box>
                    </Stack>

                    <Grid size={12}>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Typography>Did not receive the email? Check your spam filter, or</Typography>
                        <Typography variant="body1" sx={{ minWidth: 87, textDecoration: 'none', cursor: 'pointer' }} color="primary">
                          Resend code
                        </Typography>
                      </Stack>
                    </Grid>
                    <Stack sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 2, ml: 'auto' }}
                        onClick={() => setStep(2)}
                        disabled={!values.otp || Boolean(errors.otp)}
                      >
                        İleri
                      </Button>
                    </Stack>
                  </Grid>
                )}

                {step === 2 && (
                  <Grid size={12}>
                    <Stack sx={{ gap: 1 }}>
                      <InputLabel htmlFor="firstname-signup">Isim*</InputLabel>
                      <OutlinedInput
                        id="firstname-signup"
                        type="text"
                        value={values.firstname}
                        name="firstname"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Bir takma ad"
                        fullWidth
                        error={Boolean(touched.firstname && errors.firstname)}
                      />
                      {touched.firstname && errors.firstname && <FormHelperText error>{errors.firstname}</FormHelperText>}
                    </Stack>
                    <Stack sx={{ gap: 1 }}>
                      <InputLabel htmlFor="lastname-signup">Soyisim*</InputLabel>
                      <OutlinedInput
                        id="lastname-signup"
                        type="text"
                        value={values.lastname}
                        name="lastname"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Bir takma ad"
                        fullWidth
                        error={Boolean(touched.lastname && errors.lastname)}
                      />
                      {touched.lastname && errors.lastname && <FormHelperText error>{errors.lastname}</FormHelperText>}
                    </Stack>
                    <Stack sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 2, ml: 'auto' }}
                        onClick={() => setStep(3)}
                        disabled={!values.firstname || Boolean(errors.firstname) || !values.lastname || Boolean(errors.lastname)}
                      >
                        İleri
                      </Button>
                    </Stack>
                  </Grid>
                )}

                {step === 3 && (
                  <Grid size={12}>
                    <Stack sx={{ gap: 1 }}>
                      <InputLabel htmlFor="password-signup">Parola</InputLabel>
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
                    <Stack sx={{ gap: 1, marginTop: '15px' }}>
                      <InputLabel htmlFor="password-signup">Parola Tekrar</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        id="password-repeat-signup"
                        type="password"
                        value={values.password_repeat}
                        name="password_repeat"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="******"
                      />
                      {touched.password_repeat && errors.password_repeat && <FormHelperText error>{errors.password_repeat}</FormHelperText>}
                    </Stack>
                    <Stack sx={{ gap: 1, marginTop: '15px', px: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name="checked"
                            color="primary"
                            size="small"
                            sx={{ padding: 0, mr: '5px' }}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            {' '}
                            <Link component={NextLink} href="/" passHref variant="subtitle2">
                              Kullanıcı sözleşmesini'ni
                            </Link>
                            &nbsp; okudum, onaylıyorum. &nbsp;
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked2}
                            onChange={(event) => setChecked2(event.target.checked)}
                            name="checked2"
                            color="primary"
                            size="small"
                            sx={{ padding: 0, mr: '5px' }}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            {' '}
                            <Link component={NextLink} href="/" passHref variant="subtitle2">
                              KVKK Aydınlatma Metni'ni
                            </Link>
                            &nbsp; okudum, onaylıyorum. &nbsp;
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked3}
                            onChange={(event) => setChecked3(event.target.checked)}
                            name="checked3"
                            color="primary"
                            size="small"
                            sx={{ padding: 0, mr: '5px' }}
                          />
                        }
                        label={<Typography variant="body2">Eletronik ileti almayi onaylıyorum. &nbsp;</Typography>}
                      />
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="outlined" onClick={() => setStep(2)}>
                        Geri
                      </Button>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={!values.password || Boolean(errors.password) || !checked || !checked2 || isSubmitting}
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
          );
        }}
      </Formik>
    </>
  );
}

AuthRegister.propTypes = { providers: PropTypes.any, csrfToken: PropTypes.any };
