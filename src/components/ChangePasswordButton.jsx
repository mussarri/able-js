import { Button, Grid, Stack } from '@mui/material';
import React from 'react';
import { isLowercaseChar, isNumber, isSpecialChar, isUppercaseChar, minLength } from 'utils/password-validation';

const ChangePasswordButton = ({ errors, isSubmitting, newPassword, confirmPassword, currentPassword }) => {
  const checkPassword = (password) => {
    return (
      minLength(password, 8) && isUppercaseChar(password) && isLowercaseChar(password) && isNumber(password) && isSpecialChar(password)
    );
  };
  const disabled =
    isSubmitting ||
    Object.keys(errors).length !== 0 ||
    !currentPassword ||
    newPassword !== confirmPassword ||
    checkPassword(newPassword) === false;

  return (
    <Grid size={12}>
      <Stack direction="row" sx={{ gap: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button disabled={disabled} type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Grid>
  );
};

export default ChangePasswordButton;
