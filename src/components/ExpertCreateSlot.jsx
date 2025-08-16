import { creteSlotExpert } from 'actions';
// import React, { useActionState, useEffect, useState } from 'react';

// const ExpertCreateSlot = ({ slot }) => {
//   const [open, setOpen] = useState(false);
//   const [state, formAction, isPending] = useActionState(creteSlotExpert, null);

//   useEffect(() => {
//     if (state?.error) {
//       setOpen(false);
//     }
//     if (state?.success) {
//       setOpen(false);
//     }
//   }, [state]);

//   return <span style={{ minWidth: 140 }}>{slot.start.split('T')[1].slice(0, 5)} </span>;
// };

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

export default function ExpertCreateSlot({ slot }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(slot.status);
  const [state, formAction, isPending] = React.useActionState(creteSlotExpert, null);
  React.useEffect(() => {
    if (state?.error) {
      setOpen(false);
    }
    if (state?.success) {
      setOpen(false);
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
        <span style={{ minWidth: 140 }}>{slot.start.split('T')[1].slice(0, 5)} </span>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Slot Düzenle</DialogTitle>
        <div style={{ padding: '0 25px', display: 'flex', alignItems: 'center' }}>
          <p>
            {slot.start.split('T')[1].slice(0, 5)}-{slot.end.split('T')[1].slice(0, 5)}
          </p>
        </div>
        <form action={formAction} style={{ padding: '15px', minWidth: 300, textAlign: 'right' }}>
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 120, flexGrow: 1 }}>
            <input type="hidden" name="startTimes[0]" value={slot.start} />
            <input type="hidden" name="status" value={status} />
            {/* <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" value={status} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select> */}
          </FormControl>
          {slot.status == 2 && (
            <Button disabled={isPending} onClick={() => setStatus(0)} variant="contained" color="success" type="submit">
              Slot Olustur
            </Button>
          )}
        </form>
      </Dialog>
    </>
  );
}
