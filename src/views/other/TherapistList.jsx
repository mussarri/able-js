import { Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import React from 'react';
import TherapistCard from 'sections/therapist/TherapistCard';

const TherapistList = () => {
  const therapist = {};
  return (
    <div>
      <Stack sx={{ gap: 1 }}>
        <OutlinedInput id="email-login" type="email" value={''} name="email" placeholder="Uzman ara" fullWidth />
      </Stack>
      <Grid container spacing={3} sx={{ marginTop: 5, overflow: 'hidden' }}>
        <TherapistCard therapist={therapist} />
        <TherapistCard therapist={therapist} />
        <TherapistCard therapist={therapist} />
        <TherapistCard therapist={therapist} />
        <TherapistCard therapist={therapist} />
        <TherapistCard therapist={therapist} />
      </Grid>
    </div>
  );
};

export default TherapistList;
