// material-ui
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import { openSnackbar } from 'api/snackbar';
import MainCard from 'components/MainCard';
import countries from 'data/countries';

// assets
import { Add } from '@wandersonalwes/iconsax-react';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = { PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP } } };

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function TabPersonal() {
  const handleChangeDay = (event, date, setFieldValue) => {
    setFieldValue('dob', new Date(date.setDate(parseInt(event.target.value, 10))));
  };

  const handleChangeMonth = (event, date, setFieldValue) => {
    setFieldValue('dob', new Date(date.setMonth(parseInt(event.target.value, 10))));
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <Formik
        initialValues={{
          firstname: 'Stebin',
          lastname: 'Ben',
          email: 'stebin.ben@gmail.com',
          iban: '1234-1234-1234-1234',
          paytrId: 'id_2312312',

          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required.'),
          lastname: Yup.string().max(255).required('Last Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),

          address: Yup.string().min(50, 'Address to short.').required('Address is required'),

          note: Yup.string().min(150, 'Not shoulde be more then 150 char.')
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            openSnackbar({
              open: true,
              message: 'Personal profile updated successfully.',
              variant: 'alert',
              alert: { color: 'success' }
            });
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="personal-first-name">Isim</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-first-name"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Isim"
                      autoFocus
                    />
                  </Stack>
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="personal-first-name-helper">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="personal-first-name">Soyisim</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Soyisim"
                      autoFocus
                    />
                  </Stack>
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="personal-first-name-helper">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Box>
            <CardHeader title="Ödeme Bilgileri" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="personal-addrees1">IBAN</InputLabel>
                    <TextField
                      multiline
                      fullWidth
                      id="personal-addrees1"
                      value={values.iban}
                      name="iban"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="iban"
                    />
                  </Stack>
                  {touched.iban && errors.iban && (
                    <FormHelperText error id="personal-iban-helper">
                      {errors.iban}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="paytrId">Paytr ID</InputLabel>
                    <TextField
                      multiline
                      fullWidth
                      id="paytrId"
                      value={values.paytrId}
                      name="paytr"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address 02"
                    />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="personal-first-name">E-Posta</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="E-Posta Adresi"
                      autoFocus
                    />
                  </Stack>
                  {touched.email && errors.email && (
                    <FormHelperText error id="personal-email-helper">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
