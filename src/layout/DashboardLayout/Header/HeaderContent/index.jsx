import { useMemo } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project-imports
import Notification from './Notification';
 

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/DashboardLayout/Drawer/DrawerHeader';
import DarkMode from './DarkMode';
import Link from 'next/link';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Box sx={{ width: 1, mr: 1 }} />}
      {downLG && <Box sx={{ width: 1, ml: 1 }} />}

      <DarkMode />
      {/* <Notification /> */}

      {/* {downLG && <MobileSection />} */}
    </>
  );
}
