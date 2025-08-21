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

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = { PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP } } };

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function TabPersonal({ user }) {
  const [values, setValues] = useState({
    rumuz: user.userName,
    contact: user.phoneNumber
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
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
                  placeholder="rumuz"
                  autoFocus
                  slotProps={{
                    input: {
                      readOnly: true
                    }
                  }}
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
                  <TextField
                    fullWidth
                    id="personal-contact"
                    value={values.contact}
                    name="contact"
                    placeholder="Contact Number"
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
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
