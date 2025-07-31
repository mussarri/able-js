import { useRef, useState } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';

import useConfig from 'hooks/useConfig';

// assets
import { LanguageSquare, Moon } from '@wandersonalwes/iconsax-react';

// ==============================|| HEADER CONTENT - LOCALIZATION ||============================== //

export default function Localization() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { i18n, onChangeLocalization } = useConfig();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (lang) => {
    onChangeLocalization(lang);
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.5 }}>
      <IconButton
        color="secondary"
        variant="light"
        aria-label="open localization"
        ref={anchorRef}
        aria-controls={open ? 'localization-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="large"
        sx={(theme) => ({
          p: 1,
          color: 'secondary.main',
          bgcolor: open ? 'secondary.200' : 'secondary.100',
          ...theme.applyStyles('dark', { bgcolor: open ? 'background.paper' : 'background.default' })
        })}
      >
        <Moon variant="Bulk" size={26} />
      </IconButton>
    </Box>
  );
}
