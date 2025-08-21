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

export default function TabPersonal({ info }) {
  const [values, setValues] = useState({
    firstName: info?.firstName,
    lastName: info?.lastName,
    bio: info?.bio,
    contact: info?.contact
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
                  value={values.firstName}
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="First Name"
                  autoFocus
                />
              </Stack>
              {touched.firstName && errors.firstName && (
                <FormHelperText error id="personal-first-name-helper">
                  {errors.firstName}
                </FormHelperText>
              )}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="personal-first-name">Soyisim</InputLabel>
                <TextField
                  fullWidth
                  id="personal-first-name"
                  value={values.lastName}
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="First Name"
                  autoFocus
                />
              </Stack>
              {touched.lastName && errors.lastName && (
                <FormHelperText error id="personal-first-name-helper">
                  {errors.lastName}
                </FormHelperText>
              )}
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="personal-first-name">Bio</InputLabel>
                <TextField
                  fullWidth
                  id="personal-first-name"
                  value={values.bio}
                  maxRows={3}
                  name="bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="First Name"
                  autoFocus
                />
              </Stack>
              {touched.bio && errors.bio && (
                <FormHelperText error id="personal-first-name-helper">
                  {errors.bio}
                </FormHelperText>
              )}
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="personal-phone">Telefon</InputLabel>
                <Stack direction="row" sx={{ gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    id="personal-contact"
                    value={values.contact}
                    name="contact"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Contact Number"
                  />
                </Stack>
              </Stack>
              {touched.contact && errors.contact && (
                <FormHelperText error id="personal-contact-helper">
                  {errors.contact}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </Box>
      </form>
    </MainCard>
  );
}
