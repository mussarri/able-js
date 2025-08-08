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

// assets
const error500 = '/assets/images/maintenance/img-error-500.svg';

// ==============================|| ERROR 500 ||============================== //

export default function Error500Page({ title, text }) {
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const setMessage = () => {
    switch (title) {
      case 'payment':
        return 'Ödeme gerçekleşmedi.';
      default:
        return 'Bir hata oluştu.';
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
            {message || 'Hata'}
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', width: { xs: '73%', sm: '70%' }, mt: 1 }}>
            {'Bir hata oluştu. Lütfen tekrar deneyin.'}
          </Typography>
          {title == 'payment' ? (
            <Stack style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
              <Button component={Link} href={'/account-info/settings'} variant="contained" sx={{ textTransform: 'none', mt: 4 }}>
                Başka Kartla Öde
              </Button>
              <Button component={Link} href={'/'} variant="contained" sx={{ textTransform: 'none', mt: 4 }}>
                Tekrar Dene
              </Button>
            </Stack>
          ) : (
            <Button component={Link} href={APP_DEFAULT_PATH} variant="contained" sx={{ textTransform: 'none', mt: 4 }}>
              Ana Sayfaya Dön
            </Button>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
