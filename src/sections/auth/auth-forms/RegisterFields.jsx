'use client';
import { useEffect, useState } from 'react';

// next
import Image from 'next/legacy/image';
import NextLink from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

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
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { Eye, EyeSlash, Flag, Flag2, Whatsapp } from '@wandersonalwes/iconsax-react';
import { Autocomplete, CardMedia, Checkbox, FormControlLabel, IconButton, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { FlagCircleRounded } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { isLowercaseChar, isNumber, isSpecialChar, isUppercaseChar, minLength } from 'utils/password-validation';

const checkPassword = (password) => {
  return minLength(password, 8) && isUppercaseChar(password) && isLowercaseChar(password) && isNumber(password) && isSpecialChar(password);
};

export function Step0({ setStep, values, setValues }) {
  const theme = useTheme();
  const router = useRouter();
  const [isResendSubmit, setIsResendSubmit] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const pathname = usePathname();

  const registerUrl = pathname === '/register' ? 'client-register' : 'register';
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
      {values.country !== '+90' && (
        <Typography fontSize={13} sx={{ mb: 5 }} color={'textSecondary'}>
          Türkiye dışından yapılacak üyeliklerin onayı Whatsapp üzerinden yapılmaktadır.Lütfen aşağıya Whatsapp numaranızı yazınız.
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
              onFocus={() => setFieldError('gsm', '')}
              placeholder={'5443332211'}
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
                <Link component={NextLink} href={'#'} passHref variant="subtitle2">
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
                <Link component={NextLink} href={'#'} passHref variant="subtitle2">
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

        <Stack direction="row" spacing={2} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={async () => {
              try {
                setSubmitting(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/` + registerUrl, {
                  cache: 'no-store', // her seferinde güncel veri çekmek için,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    phoneNumber: values.country.slice(1) + values.gsm,
                    kvkkAccepted: checked,
                    communicationAccepted: checked2
                  })
                });
                if (res.ok) {
                  setStep(1);
                } else {
                  const data = await res.json();
                  throw new Error(data.message);
                }
              } catch (err) {
                toast.error(err.message);
                setFieldError('gsm', err.message);
                console.log(err);
              } finally {
                setSubmitting(false);
              }
            }}
            disabled={
              isSubmitting ||
              checked === false ||
              checked2 === false ||
              !values.gsm ||
              Boolean(errors.gsm) ||
              !values.country ||
              Boolean(errors.country)
            }
          >
            İleri
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}

export function Step1({ setStep, country, gsm }) {
  const theme = useTheme();
  const router = useRouter();
  const [isResendSubmit, setIsResendSubmit] = useState(false);
  const [values, setValues] = useState({
    country: country,
    gsm: gsm,
    otp: ''
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
  return (
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
          <Typography
            onClick={async () => {
              if (isResendSubmit) return;
              try {
                setSubmitting(true);
                setIsResendSubmit(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/resend-otp`, {
                  cache: 'no-store', // her seferinde güncel veri çekmek için,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    phoneNumber: values.country.slice(1) + values.gsm,
                    purpose: 3
                  })
                });

                if (res.ok) {
                  toast.success('Yeni kod gönderildi.');
                } else {
                  const data = await res.json();
                  throw new Error(data.error);
                }
              } catch (err) {
                toast.error(err.message);
                setFieldError('otp', err);
                console.log(err);
              } finally {
                setSubmitting(false);
                setIsResendSubmit(false);
              }
            }}
            variant="body1"
            sx={{
              minWidth: 87,
              width: '100%',
              cursor: 'pointer',
              textAlign: 'right',
              marginTop: '10px',
              textDecoration: 'none',
              cursor: 'pointer',
              opacity: isResendSubmit ? 0.5 : 1,
              transition: 'opacity 0.1s ease'
            }}
            color="primary"
          >
            Tekrar Gönder
          </Typography>
        </Stack>
      </Grid>
      <Stack sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 2, ml: 'auto' }}
          onClick={async () => {
            // verify-otp
            try {
              setSubmitting(true);
              const res = await fetch(`/api/auth/verify-otp`, {
                cache: 'no-store', // her seferinde güncel veri çekmek için,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  phoneNumber: values.country.slice(1) + values.gsm,
                  otp: values.otp
                })
              });
              if (res.ok) {
                setStep(2);
              } else {
                const data = await res.json();
                throw new Error(data.error);
              }
            } catch (err) {
              toast.error(err.message);
              setFieldError('otp', err);
              console.log(err);
            } finally {
              setSubmitting(false);
            }
          }}
          disabled={isResendSubmit || isSubmitting || !values.otp || Boolean(errors.otp)}
        >
          İleri
        </Button>
      </Stack>
    </Grid>
  );
}

export function Step2({ setStep }) {
  const theme = useTheme();
  const router = useRouter();
  const [values, setValues] = useState({
    password: '',
    password_repeat: ''
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

      <Stack direction="row" spacing={2} sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={() => setStep(1)}>
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
                if (checkPassword(values.password) !== true) {
                  setFieldError(
                    'password',
                    'Parola geçerli değil. Lütfen en az 8 karakter uzunluğunda, büyük harf, küçük harf, sayı ve özel karakter içeren bir parola girin.'
                  );
                  return;
                }
                if (values.password !== values.password_repeat) {
                  setFieldError('password', 'Parolalar ayni degil. Lütfen tekrar deneyin.');
                  return;
                }
                const setPassword = await fetch(`/api/auth/set-password`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    newPassword: values.password
                  })
                });
                if (setPassword.ok) {
                  setStep(3);
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
            Kayıt Ol
          </Button>
        </AnimateButton>
      </Stack>
    </Grid>
  );
}

export function Step3({ setStep }) {
  const theme = useTheme();
  const router = useRouter();
  const [values, setValues] = useState({
    rumuz: ''
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
  return (
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
          placeholder="Bir takma ad"
          fullWidth
          error={Boolean(touched.rumuz && errors.rumuz)}
        />
        {touched.rumuz && errors.rumuz && <FormHelperText error>{errors.rumuz}</FormHelperText>}
      </Stack>
      <Stack sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 2, ml: 'auto' }}
          onClick={async () => {
            try {
              setSubmitting(true);
              const checkusename = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/check-username?username=${values.rumuz}`, {
                cache: 'no-store', // her seferinde güncel veri çekmek için,
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              if (!checkusename.ok) {
                const data = await checkusename.json();
                throw new Error(data.error);
              }

              if (checkusename.ok) {
                const setUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/set-user-info`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    firstName: 'string',
                    lastName: 'string',
                    userName: values.rumuz,
                    birthDate: '2000-08-16T13:52:48.372Z',
                    gender: 0
                  })
                });

                if (setUser.ok) {
                  router.push('/');
                } else {
                  const data = await setUser.json();
                  throw new Error(data.error);
                }
              }
            } catch (err) {
              setFieldError('otp', err);
              toast.error(err.message);
              console.log(err);
            } finally {
              setSubmitting(false);
            }
          }}
          disabled={!values.rumuz || Boolean(errors.rumuz)}
        >
          Tamamla
        </Button>
      </Stack>
    </Grid>
  );
}

//boardlevel is not 6 save token
export function VerifyPhone({ next, country, gsm, purpose }) {
  const theme = useTheme();
  const router = useRouter();
  const [isResendSubmit, setIsResendSubmit] = useState(false);
  const [values, setValues] = useState({
    country: country,
    gsm: gsm,
    otp: ''
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

  const [isFirstSend, setFirstSend] = useState(purpose == 2);

  return (
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
            onBlur={handleBlur}
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
        <Stack direction="row" sx={{ justifyContent: 'start', alignItems: 'baseline' }}>
          <Typography
            onClick={async () => {
              if (isResendSubmit) return;
              try {
                setValues((prev) => {
                  return {
                    ...prev,
                    otp: ''
                  };
                });
                setSubmitting(true);
                setIsResendSubmit(true);
                const params = new URLSearchParams();
                params.set('phoneNumber', values.country.slice(1) + values.gsm);
                params.set('purpose', purpose);

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/resend-otp?${params.toString()}`, {
                  cache: 'no-store', // her seferinde güncel veri çekmek için,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

                if (res.ok) {
                  setFirstSend(true);
                  toast.success('Yeni kod gönderildi.');
                } else {
                  const data = await res.json();
                  throw new Error(data.error);
                }
              } catch (err) {
                toast.error(err.message);
              } finally {
                setSubmitting(false);
                setIsResendSubmit(false);
              }
            }}
            variant="body1"
            sx={{
              minWidth: 87,
              width: '100%',
              cursor: 'pointer',
              textAlign: 'left',
              marginTop: '10px',
              textDecoration: 'none',
              cursor: 'pointer',
              opacity: isResendSubmit ? 0.5 : 1,
              transition: 'opacity 0.1s ease'
            }}
            color="primary"
          >
            {isFirstSend ? 'Tekrar Gönder' : 'Kod Gönder'}
          </Typography>
        </Stack>
      </Grid>
      <Stack sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 2, ml: 'auto' }}
          onClick={async () => {
            // verify-otp
            try {
              setSubmitting(true);
              const res = await fetch(`/api/auth/verify-otp`, {
                cache: 'no-store', // her seferinde güncel veri çekmek için,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  phoneNumber: values.country.slice(1) + values.gsm,
                  otp: values.otp
                })
              });
              if (res.ok) {
                next();
              } else {
                const data = await res.json();
                throw new Error(data.error);
              }
            } catch (err) {
              toast.error(err.message);
              setFieldError('otp', err);
              console.log(err);
            } finally {
              setSubmitting(false);
            }
          }}
          disabled={isResendSubmit || isSubmitting || !values.otp}
        >
          İleri
        </Button>
      </Stack>
    </Grid>
  );
}

export function SetPasswordForLogin({ next }) {
  const theme = useTheme();
  const router = useRouter();
  const [values, setValues] = useState({
    password: ''
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
  const handleClickShowPasswordrepeat = () => setShowPasswordRepeat(!showPasswordRepeat);
  const handleMouseDownPasswordrepeat = (event) => {
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
          id="password-signup"
          type={showPasswordRepeat ? 'text' : 'password'}
          value={values.passwordRepeat}
          name="passwordRepeat"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="******"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPasswordrepeat}
                onMouseDown={handleMouseDownPasswordrepeat}
                edge="end"
                size="large"
                color="secondary"
              >
                {showPasswordRepeat ? <Eye /> : <EyeSlash />}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
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
                // if (validateField('password') !== true) {
                //   return;
                // }
                const setPassword = await fetch(`/api/auth/set-password`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    newPassword: values.password
                  })
                });
                if (setPassword.ok) {
                  next();
                } else {
                  const data = await setPassword.json();
                  throw new Error(data.message);
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

export function EnterPasswordForLogin({ next, country, gsm }) {
  const theme = useTheme();
  const router = useRouter();
  const [values, setValues] = useState({
    country: country,
    gsm: gsm,
    password: ''
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
                // if (validateField('password') !== true) {
                //   return;
                // }
                const loginPassword = await fetch(`/api/auth/login-password`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    password: values.password,
                    phoneNumber: values.country.slice(1) + values.gsm
                  })
                });
                if (loginPassword.ok) {
                  next();
                } else {
                  const data = await loginPassword.json();
                  throw new Error(data.message);
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

export function SetUserInfoLogin({ setStep }) {
  const theme = useTheme();
  const router = useRouter();
  const [values, setValues] = useState({
    rumuz: ''
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
  return (
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
          placeholder="Bir takma ad"
          fullWidth
          error={Boolean(touched.rumuz && errors.rumuz)}
        />
        {touched.rumuz && errors.rumuz && <FormHelperText error>{errors.rumuz}</FormHelperText>}
      </Stack>
      <Stack sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 2, ml: 'auto' }}
          onClick={async () => {
            try {
              setSubmitting(true);
              const checkusename = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/check-username?username=${values.rumuz}`, {
                cache: 'no-store', // her seferinde güncel veri çekmek için,
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              if (!checkusename.ok) {
                const data = await checkusename.json();
                throw new Error(data.message);
              }

              if (checkusename.ok) {
                const setUser = await fetch(`/api/auth/set-user-info`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userName: values.rumuz,
                    birthDate: '2000-08-16T13:52:48.372Z',
                    gender: 0
                  })
                });

                if (setUser.ok) {
                  router.refresh();
                  router.push('/');
                } else {
                  const data = await setUser.json();
                  throw new Error(data.message);
                }
              }
            } catch (err) {
              setFieldError('rumuz', err);
              toast.error(err.message);
              console.log(err);
            } finally {
              setSubmitting(false);
            }
          }}
          disabled={!values.rumuz || Boolean(errors.rumuz) || isSubmitting}
        >
          Tamamla
        </Button>
      </Stack>
    </Grid>
  );
}
