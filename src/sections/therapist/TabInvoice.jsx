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
import { first } from 'lodash-es';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { updateExpertBilling } from 'actions';
import { toast } from 'react-toastify';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = { PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP } } };

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function TabInvoice({ info }) {
  const { billing, payInfo, personalInfo } = info;
  const [values, setValues] = useState({
    firstname: personalInfo.firstName,
    lastname: personalInfo.lastName,
    phone: billing.contactPhone,
    iban: billing.iban,
    tax: billing.taxNumber,
    company_title: billing.companyTitle,
    balance: payInfo.balance,
    commissionRate: payInfo.commissionRate,
    paytrId: billing.payTrSubMerchantKey
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [state, formAction, isPending] = useActionState(updateExpertBilling, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message);
    }
    if (state?.error) {
      toast.error(state?.message);
    }
  }, [state]);

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

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('payTrSubMerchantKey', values.paytrId);
    formData.append('iban', values.iban);
    formData.append('taxNumber', values.tax);
    formData.append('companyTitle', values.company_title);
    formData.append('contactPhone', values.phone);
    formAction(formData);
  };

  return (
    <MainCard content={false} title="Fatura Bilgileri" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
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
              <InputLabel htmlFor="paytrId">Paytr ID</InputLabel>
              <TextField multiline fullWidth id="paytrId" value={values.paytrId} name="paytr" placeholder="PaytrID" readOnly />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="personal-first-name">Telefon</InputLabel>
              <TextField fullWidth id="personal-phone" value={values.phone} readOnly name="phone" placeholder="Telefon" autoFocus />
            </Stack>
            {touched.phone && errors.phone && (
              <FormHelperText error id="personal-phone-helper">
                {errors.phone}
              </FormHelperText>
            )}
          </Grid>
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
              <InputLabel htmlFor="personal-first-name">Vergi Numarası</InputLabel>
              <TextField
                fullWidth
                id="personal-last-name"
                value={values.tax}
                name="tax"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vergi No"
                autoFocus
              />
            </Stack>
            {touched.tax && errors.tax && (
              <FormHelperText error id="personal-tax-helper">
                {errors.tax}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="personal-first-name">Company Title</InputLabel>
              <TextField
                fullWidth
                id="personal-last-name"
                value={values.company_title}
                name="company_title"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="E-Posta Adresi"
                autoFocus
              />
            </Stack>
            {touched.company_title && errors.company_title && (
              <FormHelperText error id="personal-company_title-helper">
                {errors.company_title}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
      </Box>
      <CardHeader title="Bakiye Bilgileri" />
      <Divider />
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="personal-addrees1">Bakiye</InputLabel>
              <TextField multiline fullWidth id="personal-addrees1" value={values.balance} name="balance" placeholder="Bakiye" readOnly />
            </Stack>
            {touched.balance && errors.balance && (
              <FormHelperText error id="personal-balance-helper">
                {errors.balance}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="commission">Komisyon</InputLabel>
              <TextField
                multiline
                fullWidth
                id="commissionRate"
                value={values.commissionRate}
                readOnly
                name="paytr"
                placeholder="Komisyon"
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 2.5, textAlign: 'right' }} disabled={isPending} onClick={handleSubmit}>
        <Button variant="contained" type="submit">
          Kaydet
        </Button>
      </Box>
    </MainCard>
  );
}
