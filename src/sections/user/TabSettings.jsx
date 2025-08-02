import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Add, DocumentLike, Sms, Translate, Trash } from '@wandersonalwes/iconsax-react';
import { Box, Modal } from '@mui/material';
import { Grid } from '@mui/material';
import { width } from '@mui/system';
import { useRouter } from 'next/navigation';

// ==============================|| USER PROFILE - SETTINGS ||============================== //

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
  backgroundColor: '#fff',
  color: ' #1D2630',
  transition: 'boxShadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '8px',
  dispay: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2
};

export default function TabSettings() {
  const [checked, setChecked] = useState(['oc', 'usn', 'lc']);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MainCard title="Settings">
      <List sx={{ '& .MuiListItem-root': { p: 2 } }}>
        <ListItem divider>
          <ListItemIcon sx={{ color: 'primary.main', mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <DocumentLike style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-oc"
            primary={<Typography variant="h5">Order Confirmation</Typography>}
            secondary="You will be notified when customer order any product"
          />
          <Switch
            edge="end"
            onChange={handleToggle('oc')}
            checked={checked.indexOf('oc') !== -1}
            slotProps={{ input: { 'aria-labelledby': 'switch-list-label-oc' } }}
          />
        </ListItem>
        <ListItem divider>
          <ListItemIcon sx={{ color: 'primary.main', mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <Sms style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-sen"
            primary={<Typography variant="h5">Setup Email Notification</Typography>}
            secondary="Turn on email  notification to get updates through email"
          />
          <Switch
            edge="end"
            onChange={handleToggle('sen')}
            checked={checked.indexOf('sen') !== -1}
            slotProps={{ input: { 'aria-labelledby': 'switch-list-label-sen' } }}
          />
        </ListItem>
        <ListItem divider>
          <ListItemIcon sx={{ color: 'primary.main', mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <Sms style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-usn"
            primary={<Typography variant="h5">Update System Notification</Typography>}
            secondary="You will be notified when customer order any product"
          />
          <Switch
            edge="end"
            onChange={handleToggle('usn')}
            checked={checked.indexOf('usn') !== -1}
            slotProps={{ input: { 'aria-labelledby': 'switch-list-label-usn' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ color: 'primary.main', mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <Translate style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-lc"
            primary={<Typography variant="h5">Language Change</Typography>}
            secondary="You will be notified when customer order any product"
          />
          <Switch
            edge="end"
            onChange={handleToggle('lc')}
            checked={checked.indexOf('lc') !== -1}
            slotProps={{ input: { 'aria-labelledby': 'switch-list-label-lc' } }}
          />
        </ListItem>
        <ListItem>
          <Box style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%' }}>
            <Button onClick={handleOpen} variant="contained" color="error" endIcon={<Trash />}>
              Hesabi sil
            </Button>
          </Box>
        </ListItem>
      </List>
      <Stack direction="row" sx={{ gap: 2, justifyContent: 'flex-end', alignItems: 'center', mt: 2.5, paddingX: 2 }}>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button variant="contained">Save</Button>
      </Stack>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <p
            style={{
              textAlign: 'center',
              color: 'palette.secondary',
              fontSize: 14
            }}
          >
            Hesabiniz kalici olarak silinecektir. Bu islem geri alinamaz.
          </p>
          <h6
            style={{
              fontSize: 20,
              textTransform: 'uppercase',
              textAlign: 'center'
            }}
          >
            Onayliyor Musunuz ?
          </h6>
          <Grid size={12} style={{ display: 'flex', justifyContent: 'justify-center', alignItems: 'center', gap: 10 }}>
            <Button
              size="lg"
              onClick={handleClose}
              variant="contained"
              color="secondary"
              endIcon={<Add style={{ transform: 'rotate(45deg)' }} />}
            >
              Iptal
            </Button>
            <Button
              onClick={() => {
                router.refresh();
                router.push('/success?type=account-deleted');
              }}
              style={{ marginLeft: 'auto' }}
              size="lg"
              variant="contained"
              color="error"
              endIcon={<Trash />}
            >
              Hesabi sil
            </Button>
          </Grid>
        </Box>
      </Modal>
    </MainCard>
  );
}
