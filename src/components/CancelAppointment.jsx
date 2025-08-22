import { deleteSlotsAdmin } from 'actions';

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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';

export default function CancelAppointment({ slot, expert }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(slot.status);
  const [state, formAction, isPending] = React.useActionState(deleteSlotsAdmin, null);
  React.useEffect(() => {
    if (state?.error) {
      toast.error(state?.message);
    }
    if (state?.success) {
      toast.error(state?.message);
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
        <span style={{ minWidth: 140 }}>{slot.startTime.split('T')[1].slice(0, 5)} </span>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Randvu Iptal Et</DialogTitle>
        <div
          className="expertSlotInfo"
          style={{ padding: '0 25px', display: 'flex', gap: 0, alignItems: 'start', flexDirection: 'column' }}
        >
          <p>{expert.name}</p>
          <div className="slottime">
            {slot.startTime.split('T')[1].slice(0, 5)}-{slot.endTime.split('T')[1].slice(0, 5)}
          </div>
        </div>
        <form action={formAction} style={{ padding: '15px', minWidth: 300, textAlign: 'right' }}>
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 120, flexGrow: 1 }}>
            <input type="hidden" name="slotIds" value={JSON.stringify([slot.id])} />
            <input type="hidden" name="expertId" value={expert.expertId} />
          </FormControl>
          {slot.status == 0 && (
            <Button disabled={isPending} onClick={() => setStatus(0)} variant="contained" color="error" type="submit">
              Iptal Et
            </Button>
          )}
        </form>
      </Dialog>
    </>
  );
}
