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

const skills = [
  'Adobe XD',
  'After Effect',
  'Angular',
  'Animation',
  'ASP.Net',
  'Bootstrap',
  'C#',
  'CC',
  'Corel Draw',
  'CSS',
  'DIV',
  'Dreamweaver',
  'Figma',
  'Graphics',
  'HTML',
  'Illustrator',
  'J2Ee',
  'Java',
  'Javascript',
  'JQuery',
  'Logo Design',
  'Material UI',
  'Motion',
  'MVC',
  'MySQL',
  'NodeJS',
  'npm',
  'Photoshop',
  'PHP',
  'React',
  'Redux',
  'Reduxjs & tooltit',
  'SASS',
  'SCSS',
  'SQL Server',
  'SVG',
  'UI/UX',
  'User Interface Designing',
  'Wordpress'
];

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
          rumuz: 'Stebin',
          lastname: 'Ben',
          email: 'stebin.ben@gmail.com',
          dob: new Date('03-10-1993'),
          countryCode: '+91',
          contact: 9652364852,
          designation: 'Full Stack Developer',
          address: '3801 Chalk Butte Rd, Cut Bank, MT 59427, United States',
          address1: '301 Chalk Butte Rd, Cut Bank, NY 96572, New York',
          country: 'US',
          state: 'California',
          skill: [
            'Adobe XD',
            'Angular',
            'Corel Draw',
            'Figma',
            'HTML',
            'Illustrator',
            'Javascript',
            'Logo Design',
            'Material UI',
            'NodeJS',
            'npm',
            'Photoshop',
            'React',
            'Reduxjs & tooltit',
            'SASS'
          ],
          note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required.'),
          lastname: Yup.string().max(255).required('Last Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          dob: Yup.date().max(maxDate, 'Age should be 18+ years.').required('Date of birth is requird.'),
          contact: Yup.number()
            .test('len', 'Contact should be exactly 10 digit', (val) => val?.toString().length === 10)
            .required('Phone number is required'),
          designation: Yup.string().required('Designation is required'),
          address: Yup.string().min(50, 'Address to short.').required('Address is required'),
          country: Yup.string().required('Country is required'),
          state: Yup.string().required('State is required'),
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
                    <InputLabel htmlFor="personal-first-name">Rumuz</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-first-name"
                      value={values.rumuz}
                      name="rumuz"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                    />
                  </Stack>
                  {touched.rumuz && errors.rumuz && (
                    <FormHelperText error id="personal-first-name-helper">
                      {errors.rumuz}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="personal-phone">Telefon</InputLabel>
                    <Stack direction="row" sx={{ gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                      <Select value={values.countryCode} name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                        <MenuItem value="+91">+91</MenuItem>
                        <MenuItem value="1-671">1-671</MenuItem>
                        <MenuItem value="+36">+36</MenuItem>
                        <MenuItem value="(225)">(255)</MenuItem>
                        <MenuItem value="+39">+39</MenuItem>
                        <MenuItem value="1-876">1-876</MenuItem>
                        <MenuItem value="+7">+7</MenuItem>
                        <MenuItem value="(254)">(254)</MenuItem>
                        <MenuItem value="(373)">(373)</MenuItem>
                        <MenuItem value="1-664">1-664</MenuItem>
                        <MenuItem value="+95">+95</MenuItem>
                        <MenuItem value="(264)">(264)</MenuItem>
                      </Select>
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
        )}
      </Formik>
    </MainCard>
  );
}
