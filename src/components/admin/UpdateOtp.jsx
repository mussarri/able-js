import { updateOtp } from 'actions';

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { DialogContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';

function UpdateOtp({ text, otpId, code }) {
  const [open, setOpen] = React.useState(false);
  const [state, formAction, isPending] = React.useActionState(updateOtp, null);
  React.useEffect(() => {
    if (state?.error) {
      toast.error(state?.message);
    }
    if (state?.success) {
      toast.success(state?.message);
    }
  }, [state]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <div onClick={handleClickOpen}>
        <Typography sx={{ minWidth: 140, cursor: 'pointer', '&:hover': { color: 'black' } }}>{text} </Typography>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>OTP Guncelle</DialogTitle>
        <DialogContent>
          <p>{code}</p>
        </DialogContent>
        <form action={formAction} style={{ padding: '15px', minWidth: 300, textAlign: 'right' }}>
          <input type="hidden" name="otpId" value={otpId} />
          {
            <Button disabled={isPending} variant="contained" color="primary" type="submit">
              Update OTP
            </Button>
          }
        </form>
      </Dialog>
    </>
  );
}

export default UpdateOtp;
