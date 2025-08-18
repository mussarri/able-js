'use client';
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

// project-imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { APP_DEFAULT_PATH } from 'config';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { Eye, EyeSlash, Flag, Flag2, Whatsapp } from '@wandersonalwes/iconsax-react';
import { Autocomplete, CardMedia, Checkbox, FormControlLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { FlagCircleRounded } from '@mui/icons-material';

export function Step0({ setStep, values, setValues }) {
  const theme = useTheme();
  const router = useRouter();
  const [isResendSubmit, setIsResendSubmit] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const setFieldValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const setFieldError = (name, value) => {
    setErrors({ ...errors, [name]: value });
  };
  const setFieldTouched = (name, value) => {
    setTouched({ ...touched, [name]: value });
  };
  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
  };
  const handleBlur = (event) => {
    setFieldTouched(event.target.name, true);
  };

  return (
    <Grid size={12}>
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

        <Stack direction="row" spacing={2} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={async () => {
              try {
                setSubmitting(true);
                const res = await fetch(`/api/auth/login-start`, {
                  cache: 'no-store', // her seferinde güncel veri çekmek için,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    phoneNumber: values.country.slice(1) + values.gsm
                  })
                });
                if (res.ok) {
                  setStep(1);
                }
              } catch (err) {
                setFieldError('gsm', err);
                console.log(err);
              } finally {
                setSubmitting(false);
              }
            }}
            disabled={isSubmitting || !values.gsm || Boolean(errors.gsm) || !values.country || Boolean(errors.country)}
          >
            İleri
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}

export function Step1({ setStep, values, setValues }) {
  const theme = useTheme();
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const setFieldValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const setFieldError = (name, value) => {
    setErrors({ ...errors, [name]: value });
  };
  const setFieldTouched = (name, value) => {
    setTouched({ ...touched, [name]: value });
  };
  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
  };
  const handleBlur = (event) => {
    setFieldTouched(event.target.name, true);
  };

  return (
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

      <Stack direction="row" spacing={2} sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={() => setStep(0)}>
          Geri
        </Button>
        <AnimateButton>
          <Button
            disableElevation
            disabled={!values.password || Boolean(errors.password) || isSubmitting}
            fullWidth
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={async () => {
              try {
                setSubmitting(true);

                const enterPassword = await fetch(`/api/auth/login-password`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    password: values.password,
                    phoneNumber: values.country.slice(1) + values.gsm
                  })
                });

                if (enterPassword.ok) {
                  console.log('Giriş başarılı!');

                  router.refresh();
                  router.push('/');
                } else {
                  throw new Error('Giriş başarısız!');
                }
              } catch (err) {
                setFieldError('password', err);
                console.log(err);
                setSubmitting(false);
              }
            }}
          >
            Giriş Yap
          </Button>
        </AnimateButton>
      </Stack>
    </Grid>
  );
}
