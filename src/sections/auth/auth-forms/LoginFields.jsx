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
import { FlagCircleRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

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
              onFocus={() => setFieldError('gsm', '')}
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
              onFocus={() => setFieldError('gsm', '')}
              placeholder={'+01-54433322211'}
            />
          )}
        </Stack>
        {touched?.gsm && errors?.gsm && <FormHelperText error>{errors?.gsm}</FormHelperText>}

        <Stack direction="row" spacing={2} sx={{ mt: 0, display: 'flex', justifyContent: 'flex-end' }}>
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

                const data = await res.json();
                if (!res.ok) {
                  throw new Error(data.error);
                }
                if (data.boardLevel == 6) {
                  setStep(1);
                } else if (data.boardLevel < 4) {
                  toast.warning('Kullanici kayıdı tamamlanmadı. Telefon numaranizi dogrulayin.');
                  setStep(2);
                } else if (data.boardLevel < 6) {
                  setStep(3);
                  toast.warning('Kullanici kayıdı tamamlanmadı.');
                }
              } catch (err) {
                console.log(err);
                setFieldError('gsm', err.message || 'Bilinmeyen bir hata');
                toast.error(err.message || 'Bilinmeyen bir hata');
              } finally {
                setSubmitting(false);
              }
            }}
            disabled={isSubmitting || !values.gsm || !values.country}
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

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid size={12}>
      <Stack sx={{ gap: 1 }}>
        <InputLabel htmlFor="password-signup">Parola</InputLabel>

        <OutlinedInput
          fullWidth
          error={Boolean(touched.password && errors.password)}
          id="password-signup"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="******"
          onFocus={() => setFieldError('password', '')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
                color="secondary"
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </IconButton>
            </InputAdornment>
          }
        />

        {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
      </Stack>
      <Stack sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography component={NextLink} href="/forgot-password" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
          Parolamı Unuttum
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={() => setStep(0)}>
          Geri
        </Button>
        <AnimateButton>
          <Button
            disableElevation
            disabled={!values.password || isSubmitting}
            fullWidth
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={async () => {
              try {
                setSubmitting(true);

                const response = await fetch(`/api/auth/login-password`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    password: values.password,
                    phoneNumber: values.country.slice(1) + values.gsm
                  })
                });

                const data = await response.json();

                if (response.ok) {
                  router.push('/');
                } else {
                  toast.error(data.error || 'Giriş başarısız.');
                }
              } catch (err) {
                console.error(err);
                setFieldError('password', err instanceof Error ? err.message : String(err));
              } finally {
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
