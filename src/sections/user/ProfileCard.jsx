import PropTypes from 'prop-types';

// next
import Link from 'next/link';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';
import { ThemeDirection } from 'config';
import { padding } from '@mui/system';

// assets

// ==============================|| USER PROFILE - TOP CARD ||============================== //

export default function ProfileCard({ focusInput }) {
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <MainCard
      border={false}
      content={false}
      sx={(theme) => ({
        bgcolor: 'primary.lighter',
        ...theme.applyStyles('dark', { bgcolor: 'primary.700' }),
        position: 'relative',
        py: 2
      })}
    >
      <Box
        sx={(theme) => ({
          position: 'absolute',
          bottom: '-7px',
          left: 0,
          zIndex: 1,
          ...(theme.direction === ThemeDirection.RTL && { transform: 'rotate(180deg)', top: -7, bottom: 'unset' })
        })}
      ></Box>
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 5 }}>
        <Grid>
          <Stack direction="row" sx={{ gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
            <Box sx={{ ml: { xs: 0, sm: 1 } }}></Box>
            <Stack sx={{ gap: 0.75 }}>
              <Typography variant="h5">Edit Your Profile</Typography>
              <Typography variant="body2">Complete your profile to unlock all features</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid sx={{ mx: { xs: 2, sm: 3 }, my: { xs: 1, sm: 0 }, mb: { xs: 2, sm: 0 } }} size={downSM ? 12 : 'auto'}>
          <Button variant="contained" fullWidth={downSM} component={Link} href="/account-info/personal" onClick={focusInput}>
            Edit Your Profile
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={(theme) => ({
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          ...(theme.direction === ThemeDirection.RTL && { transform: 'rotate(180deg)', top: 16, bottom: 'unset' })
        })}
      ></Box>
    </MainCard>
  );
}

ProfileCard.propTypes = { focusInput: PropTypes.func };
