import { Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import React from 'react';
import TherapistCard from 'sections/therapist/TherapistCard';
import TherapistListSearch from '../../components/Search';

const TherapistList = ({ list }) => {
  return (
    <div>
      <TherapistListSearch />
      <Grid container spacing={3} sx={{ marginTop: 5, overflow: 'hidden' }}>
        {list.map((therapist) => (
          <TherapistCard key={therapist.expertId} therapist={therapist} />
        ))}
      </Grid>
    </div>
  );
};

export default TherapistList;
