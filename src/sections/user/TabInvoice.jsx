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

import * as Yup from 'yup';

// project-imports
import { openSnackbar } from 'api/snackbar';
import MainCard from 'components/MainCard';
import countries from 'data/countries';

// assets
import { Add } from '@wandersonalwes/iconsax-react';
import { useState } from 'react';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = { PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP } } };

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function TabPersonal() {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    address: '',
    address1: '',
    email: ''
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

  const handleSubmit = () => {};

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
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
        <CardHeader title="Adres" />
        <Divider />
        <Box sx={{ p: 2.5 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="personal-addrees1">Adres 01</InputLabel>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  id="personal-addrees1"
                  value={values.address}
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Address 01"
                />
              </Stack>
              {touched.address && errors.address && (
                <FormHelperText error id="personal-address-helper">
                  {errors.address}
                </FormHelperText>
              )}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="personal-addrees2">Adres 02</InputLabel>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  id="personal-addrees2"
                  value={values.address1}
                  name="address1"
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
    </MainCard>
  );
}
