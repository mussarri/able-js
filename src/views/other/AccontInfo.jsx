'use client';
import PropTypes from 'prop-types';

import React, { useEffect, useRef } from 'react';

// next
import { usePathname } from 'next/navigation';

// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import { GRID_COMMON_SPACING } from 'config';

import ProfileCard from 'sections/user/ProfileCard';
import ProfileTabs from 'sections/user/ProfileTabs';
import TabPassword from 'sections/user/TabPassword';

import { handlerActiveItem, useGetMenuMaster } from 'api/menu';
import { Button, Fab, Modal } from '@mui/material';
import { Add } from '@wandersonalwes/iconsax-react';
import { alignItems, Box } from '@mui/system';
import Typography from 'themes/typography';
import TabInvoice from 'sections/user/TabInvoice';
import TabPersonal from 'sections/user/TabPersonal';

// ==============================|| PROFILE - USER ||============================== //

export default function UserProfile({ tab, user }) {
  const inputRef = useRef(null);
  const pathname = usePathname();
  const { menuMaster } = useGetMenuMaster();

  console.log(user);

  // uzman hesap bilgileri iban, paytrid,
  // adres mail kullanici

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (menuMaster.openedItem !== 'user-profile') handlerActiveItem('user-profile');
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ProfileTabs focusInput={focusInput} user={user} />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        {tab === 'personal' && <TabPersonal user={user} />}
        {tab === 'invoice' && <TabInvoice user={user} />}
        {tab === 'password' && <TabPassword />}
      </Grid>
    </Grid>
  );
}

UserProfile.propTypes = { tab: PropTypes.string };
