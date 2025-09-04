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

export function EnterPhone({ next, values, setValues }) {
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

        <Stack direction="row" spacing={2} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={async () => {
              try {
                setSubmitting(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/forget-password`, {
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
                next();
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
            Kod Gönder
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}

export function SetPasswordForForgot({ next, country, gsm }) {
  const theme = useTheme();
  const router = useRouter();
  const [values, setValues] = useState({
    password: '',
    passwordRepeat: ''
  });
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
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const handleClickShowPasswordRepeat = () => setShowPasswordRepeat(!showPasswordRepeat);
  const handleMouseDownPasswordRepeat = (event) => {
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
      <Stack sx={{ gap: 1, mt: 2 }}>
        <InputLabel htmlFor="password-signup">Parola Tekrar</InputLabel>
        <OutlinedInput
          fullWidth
          error={Boolean(touched.passwordRepeat && errors.passwordRepeat)}
          id="passwordRepeat-signup"
          type={showPasswordRepeat ? 'text' : 'password'}
          value={values.passwordRepeat}
          name="passwordRepeat"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="******"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle passwordRepeat visibility"
                onClick={handleClickShowPasswordRepeat}
                onMouseDown={handleMouseDownPasswordRepeat}
                edge="end"
                size="large"
                color="secondary"
              >
                {showPasswordRepeat ? <Eye /> : <EyeSlash />}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched.passwordRepeat && errors.passwordRepeat && <FormHelperText error>{errors.passwordRepeat}</FormHelperText>}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
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
                if (checkPassword(values.password) !== true) {
                  setFieldError(
                    'password',
                    'Parola geçerli değil. Lütfen en az 8 karakter uzunluğunda, büyük harf, küçük harf, sayı ve özel karakter içeren bir parola girin.'
                  );
                  return;
                }
                if (values.password !== values.passwordRepeat) {
                  setFieldError('password', 'Parolalar ayni degil. Lütfen tekrar deneyin.');
                  return;
                }
                const setPassword = await fetch(`/api/auth/set-new-password`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    newPassword: values.password,
                    phoneNumber: country.slice(1) + gsm
                  })
                });
                if (setPassword.ok) {
                  router.refresh();
                  router.push('/');
                } else {
                  const data = await setPassword.json();
                  throw new Error(data.error);
                }
              } catch (err) {
                toast.error(err.message);
                setFieldError('password', err);
                console.log(err);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            İleri
          </Button>
        </AnimateButton>
      </Stack>
    </Grid>
  );
}
