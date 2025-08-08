'use client';

// next
import Link from 'next/link';
import Image from 'next/image';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Error500Page from 'views/maintenance/Error500';

// project-imports
import { APP_DEFAULT_PATH } from '../config';

// assets
const error500 = '/assets/images/maintenance/img-error-500.svg';

// ==============================|| ERROR 500 ||============================== //

export default function Error500() {
  return <Error500Page />;
}
