import { useActionState, useState } from 'react';

// material-ui
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// project-imports
import { openSnackbar } from 'api/snackbar';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';

// third-party
import * as Yup from 'yup';

// assets
import { Eye, EyeSlash } from '@wandersonalwes/iconsax-react';
import { expertChangePassword } from 'actions';

import PasswordCriters from 'components/PasswordCriters';
import ChangePasswordButton from 'components/ChangePasswordButton';

// ==============================|| USER PROFILE - PASSWORD CHANGE ||============================== //

export default function TabPassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(expertChangePassword, null);
  const [values, setValues] = useState({
    old: '',
    newPassword: '',
    confirm: ''
  });

  useEffect(() => {
    if (state?.success) {
      openSnackbar({ message: 'Şifre başarıyla değiştirildi.' });
    }
    if (state?.error) {
      router.push('/error?type=password');
    }
  }, [state]);

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

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('currentPassword', values.old);
    formData.append('newPassword', values.newPassword);
  };

  return (
    <MainCard title="Change Password">
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid container spacing={3} size={{ xs: 12, sm: 6 }}>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="password-old">Mevcut Parola</InputLabel>
                <OutlinedInput
                  placeholder="Mevcut Parola"
                  id="password-old"
                  type={showOldPassword ? 'text' : 'password'}
                  value={values.old}
                  name="old"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showOldPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="password-old"
                />
              </Stack>
              {touched.old && errors.old && (
                <FormHelperText error id="password-old-helper">
                  {errors.old}
                </FormHelperText>
              )}
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="password-password">Yeni Parola</InputLabel>
                <OutlinedInput
                  placeholder="Yeni Parola"
                  id="password-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={values.newPassword}
                  name="newPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showNewPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="password-password"
                />
              </Stack>
              {touched.password && errors.password && (
                <FormHelperText error id="password-password-helper">
                  {errors.password}
                </FormHelperText>
              )}
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="password-confirm">Yeni Parola Tekrar</InputLabel>
                <OutlinedInput
                  placeholder="Yeni Parola Tekrar"
                  id="password-confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={values.confirm}
                  name="confirm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showConfirmPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="password-confirm"
                />
              </Stack>
              {touched.confirm && errors.confirm && (
                <FormHelperText error id="password-confirm-helper">
                  {errors.confirm}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <PasswordCriters password={values.newPassword} />
          <ChangePasswordButton
            errors={errors}
            isSubmitting={isSubmitting}
             currentPassword={values.old}
            newPassword={values.newPassword}
            confirmPassword={values.confirm}
          />
        </Grid>
      </form>
    </MainCard>
  );
}
