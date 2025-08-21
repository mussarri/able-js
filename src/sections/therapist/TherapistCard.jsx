'use client';
import { Box, Button, CardContent, CardMedia, Divider, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { School, Videocam } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import Link from 'next/link';
import useConfig from 'hooks/useConfig';
import { Edit, More, Setting } from '@wandersonalwes/iconsax-react';
import { useRouter } from 'next/navigation';
const TherapistCard = ({ therapist }) => {
  const theme = useTheme();
  const { mode } = useConfig();
  const router = useRouter();

  return (
    <Grid
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      sx={{ border: '1px solid', borderColor: theme.palette.secondary.light, borderRadius: '20px', overflow: 'hidden' }}
    >
      <div style={{ width: '100%' }}>
        <Image
          src={therapist?.profilePictureUrl || '/assets/images/profile-picture.jpeg'}
          alt={''}
          width={350}
          height={350}
          style={{ objectFit: 'contain' }}
          className="profile-img"
        />
      </div>
      <div style={{ padding: '20px 20px 10px', textAlign: 'left' }}>
        <div style={{ fontSize: 16, fontWeight: 'semibold', color: theme.palette.text.main }}>
          {therapist?.firstName + ' ' + therapist?.lastName}
        </div>
        <p style={{ fontSize: 12, color: theme.palette.secondary.main }}>
          {therapist?.title || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim.'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <div
            style={{
              fontSize: 11,
              color: theme.palette.secondary.main,
              textAlign: 'center',
              display: 'flex',
              gap: 0,
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <MicIcon sx={{ fontSize: 22 }} />
            <div>
              <span style={{ fontSize: 16, fontWeight: 'semibold', color: theme.palette.text.primary }}>{therapist?.soundPrice}₺</span>{' '}
              <br />
              Sesli 30dk{' '}
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              color: theme.palette.secondary.main,
              textAlign: 'center',
              display: 'flex',
              gap: 0,
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Videocam sx={{ fontSize: 22 }} />
            <div>
              <span style={{ fontSize: 16, fontWeight: 'semibold', color: theme.palette.text.primary }}>{therapist?.videoPrice}₺</span>{' '}
              <br />
              Görüntülü 30dk{' '}
            </div>
          </div>
        </div>
      </div>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '15px'
        }}
      >
        {therapist?.isAvailableRightNow && (
          <Button
            fullWidth
            sx={{
              borderRadius: 0,
              borderTopRightRadius: 0,
              height: '50px'
            }}
            color="success"
            variant="contained"
            onClick={() => {
              router.push('/user/buy-session/now/' + therapist?.expertId);
            }}
          >
            Şimdi Görüş
          </Button>
        )}

        <Button
          fullWidth
          sx={{
            borderRadius: 0,
            borderTopRightRadius: 0,
            height: '50px'
          }}
          variant="contained"
          onClick={() => {
            router.push('/user/buy-session/' + therapist?.expertId);
          }}
        >
          Randevu Al
        </Button>
      </Box>

      {/* <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <Link style={{ width: '100%' }} href={'/buy-session/ahmet?type=now'}>
          <Button
            variant={mode == 'dark' ? 'outlined' : 'contained'}
            color="success"
            style={{ width: '100%', height: '50px', borderRadius: '0 0 0 10px ' }}
          >
            Şimdi Görüş
          </Button>
        </Link>
        <Link style={{ width: '100%' }} href={'/buy-session/ahmet'}>
          <Button variant={mode == 'dark' ? 'outlined' : 'contained'} style={{ width: '100%', height: '50px', borderRadius: '0 0 10px 0' }}>
            Randevu Al
          </Button>
        </Link>
      </div> */}
    </Grid>
  );
};

export default TherapistCard;
