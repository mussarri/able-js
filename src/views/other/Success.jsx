'use client';

// next
import Link from 'next/link';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import { APP_DEFAULT_PATH } from 'config';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useRedirectAfterSomeSeconds from 'utils/redirect-after-seconds';

// assets
const error500 = '/assets/images/maintenance/img-error-500.svg';

// ==============================|| ERROR 500 ||============================== //

export default function Success({ title }) {
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  useRedirectAfterSomeSeconds('/', 2);
  const setMessage = () => {
    switch (title) {
      case 'account-deleted':
        return 'Hesabınız başarıyla silindi.';
      default:
        return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  };
  const message = setMessage();


  return (
    <Grid container direction="column" spacing={3} sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Grid size={12}>
        <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: 325 }}>
            <CardMedia component="img" src={error500} alt="error 500" sx={{ height: 1 }} />
          </Box>
        </Stack>
      </Grid>
      <Grid size={12}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography align="center" variant={downSM ? 'h2' : 'h1'}>
            {message || 'Başarılı'}
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', width: { xs: '73%', sm: '70%' }, mt: 1 }}>
            Anasayfaya yönlendiriliyorsunuz...
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
