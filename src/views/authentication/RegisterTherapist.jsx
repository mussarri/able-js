// next
import Link from 'next/link';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import RegisterTherapistSection from 'sections/auth/auth-forms/AuthRegisterTherapist';

// ================================|| REGISTER ||================================ //

export default function Register() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Kayıt Ol</Typography>
            <Typography component={Link} href={'/login'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Zaten hesabın var mı? Giriş yap
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <RegisterTherapistSection />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
