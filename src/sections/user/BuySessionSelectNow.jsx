'use client';

import { startTransition, useActionState, useCallback, useState } from 'react';

// material-ui
import Stack from '@mui/material/Stack';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
// project-imports
import MainCard from 'components/MainCard';
import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  Tab,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { Box, maxWidth } from '@mui/system';
import { TabList } from '@mui/lab';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
// ==============================|| DATE PICKER - BASIC ||============================== //

import { School, Videocam } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import { useEffect } from 'react';
import { bookImmediat, bookImmediate } from 'actions';

const basicDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDateFns}>
  <Stack sx={{ gap: 3}}>
    <DesktopDatePicker
      label="Date Desktop"
      inputFormat="MM/dd/yyyy"
      value={value}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} />}
    />
    <MobileDatePicker
      label="Date Mobile"
      inputFormat="MM/dd/yyyy"
      value={value}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} />}
    />
    <TimePicker label="Time" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
    <DateTimePicker
      label="Date & Time Picker"
      value={value}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} />}
    />
  </Stack>
</LocalizationProvider>`;

export default function BasicDateTimePickers({ durations, prices }) {
  const theme = useTheme();
  const today = dayjs();
  const date = new Date();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(bookImmediate, null);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
      router.push('/user/session-history');
    }
    if (state?.error) {
      router.push('/error?type=appointment');
    }
  }, [state]);

  const params = useParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [duration, setDuration] = useState();

  const [alignment, setAlignment] = useState('');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('expertId', params.name);
    formData.append('status', alignment);
    formData.append('duration', duration);

    startTransition(() => {
      formAction(formData);
    });
  };

  const price = alignment && (alignment === '0' ? prices?.videoPrice : prices?.soundPrice);
  const totalPrice = duration && (price * duration) / 30;

  return (
    <MainCard sx={{ maxWidth: 700 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack sx={{ gap: 3 }}>
          <Stack>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              sx={{
                '& .MuiToggleButton-root': {
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '.icon': {
                      color: theme.palette.primary.contrastText
                    },
                    '.text': {
                      color: theme.palette.secondary.light
                    }
                  },
                  '&.Mui-selected': {
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,

                    '&:hover': {
                      bgcolor: theme.palette.primary.main
                    },
                    '.icon': {
                      color: theme.palette.primary.contrastText
                    },
                    '.text': {
                      color: theme.palette.secondary.light
                    }
                  }
                }
              }}
            >
              <ToggleButton value="1" aria-label="first">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '5px 10px'
                  }}
                >
                  <div className="icon">
                    <MicIcon />{' '}
                  </div>
                  <Typography variant="h4" textAlign="center" fontWeight={'light'}>
                    {prices?.soundPrice}₺
                  </Typography>
                  <Typography
                    style={{ minWidth: 'max-content' }}
                    variant="subtitle2"
                    textAlign="center"
                    fontWeight={'lighter'}
                    className="text"
                  >
                    Sesli 30dk
                  </Typography>
                </div>
              </ToggleButton>

              <ToggleButton value="0" aria-label="second">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '5px 10px'
                  }}
                >
                  <div className="icon">
                    <Videocam />
                  </div>
                  <Typography variant="h4" textAlign="center" fontWeight={'light'}>
                    {prices?.videoPrice}₺
                  </Typography>
                  <Typography variant="subtitle2" textAlign="center" fontWeight={'lighter'} className="text">
                    Görüntülü 30dk
                  </Typography>
                </div>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          {
            <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
              <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
                Tarih Seçiniz{' '}
              </InputLabel>
              <DesktopDatePicker sx={{ width: '100%' }} format="dd/MM/yyyy" value={date} disabled />
            </Stack>
          }

          {durations && durations?.availableDurations.length > 0 && (
            <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'items-start', flexDirection: 'row' }}>
              <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
                Süre Seçiniz{' '}
              </InputLabel>
              <Box sx={{ width: '100%' }}>
                {durations.availableDurations.map((item, index) => (
                  <Button
                    key={index}
                    color={duration == item ? 'primary' : 'secondary'}
                    onClick={() => setDuration(item)}
                    variant={duration == item ? 'contained' : 'text'}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            </Stack>
          )}
          {totalPrice && (
            <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'justify-between', flexDirection: 'row' }}>
              <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
                Tutar{' '}
              </InputLabel>
              <Typography variant="h6" fontWeight="bold" sx={{ width: '100%', textAlign: 'right' }}>
                1000TL
              </Typography>
            </Stack>
          )}
          <Stack sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isPending || !alignment || !duration}>
              Satin Al
            </Button>
          </Stack>
        </Stack>
      </LocalizationProvider>
    </MainCard>
  );
}
