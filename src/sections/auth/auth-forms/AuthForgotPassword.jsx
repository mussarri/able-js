'use client';

// next
import { useRouter } from 'next/navigation';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';

// project-imports
import { openSnackbar } from 'api/snackbar';
import AnimateButton from 'components/@extended/AnimateButton';
import useScriptRef from 'hooks/useScriptRef';
import { Autocomplete, Box, CardMedia, TextField } from '@mui/material';
import countries from 'utils/countries';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

export default function AuthForgotPassword() {
  const scriptedRef = useScriptRef();
  const router = useRouter();

  const [values, setValues] = useState({
    gsm: '',
    country: '+90'
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched({
      ...touched,
      [name]: true
    });
    if (value && !errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setSubmitting(true);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
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

        <Grid size={12} sx={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
          <AnimateButton>
            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
              Send Password Reset
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
}
