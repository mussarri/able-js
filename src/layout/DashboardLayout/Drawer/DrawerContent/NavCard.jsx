// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Whatsapp } from '@wandersonalwes/iconsax-react';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import MainCard from 'components/MainCard';

// assets
const avatar = '/assets/images/support.png';

// ==============================|| DRAWER CONTENT - NAV CARD ||============================== //

export default function NavCard() {
  return (
    <MainCard sx={{ bgcolor: 'secondary.lighter', m: 3 }}>
      <Stack sx={{ gap: 2.5, alignItems: 'center' }}>
        <CardMedia component="img" image={avatar} />
        <Stack sx={{ alignItems: 'center' }}>
          <Typography variant="h5">Müşteri Hizmetleri</Typography>
          <Typography variant="h6" color="secondary">
            Mükemmel destek veriyoruz
          </Typography>
        </Stack>
        <AnimateButton>
          <Button variant="contained" color="success" startIcon={<Whatsapp />}>
            Bağlan
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  );
}
