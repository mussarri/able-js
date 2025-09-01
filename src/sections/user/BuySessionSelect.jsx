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
import { createAppointmentDrafts } from 'actions';

function countConsecutiveFreeSlots(allowedTimes, selectedTime) {
  if (!selectedTime) return 0; // seçili saat yoksa direkt 0 dön

  const parseTime = (timeStr) => {
    if (!timeStr || typeof timeStr !== 'string') return null; // geçersiz saatleri yok say
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m; // toplam dakika
  };

  const parsedTimes = allowedTimes
    .map(parseTime)
    .filter((t) => t !== null) // null olanları at
    .sort((a, b) => a - b);

  const start = parseTime(selectedTime);
  if (start === null) return 0;

  let count = 0;
  let currentTime = start;

  while (parsedTimes.includes(currentTime)) {
    count++;
    currentTime += 30;
  }

  return count;
}

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

export default function BasicDateTimePickers({ days, times, durations, prices }) {
  const theme = useTheme();
  const today = dayjs();
  const maxDate = today.add(30, 'day');
  var currentdate = new Date();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(createAppointmentDrafts, null);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
      router.push('/user/session-history');
    }
    if (state?.error) {
      router.push('/error?type=appointment');
    }
  }, [state]);

  const date = searchParams.get('date');
  const time = searchParams.get('time');

  const params = useParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // Tarihin seçilebilir olup olmadığını kontrol eden fonksiyon
  const isDateAllowed = (date) => {
    return days
      .map((item) => {
        return { date: dayjs(item.date), isAvailable: item.isAvailable };
      })
      .some((allowedDate) => allowedDate.date.isSame(date, 'day'));
  };

  const [day, setDay] = useState(today);

  const [duration, setDuration] = useState();

  const [alignment, setAlignment] = useState('');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('startTime', time);
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
              <DesktopDatePicker
                sx={{ width: '100%' }}
                format="dd/MM/yyyy"
                value={date ? new Date(date) : day}
                onChange={(newValue) => {
                  setDay(newValue);
                  const localDate = newValue.toLocaleDateString('en-CA'); // YYYY-MM-DD formatında
                  router.push(pathname + '?' + createQueryString('date', localDate));
                }}
                shouldDisableDate={(date) => {
                  if (!date) return true; // null ise disable
                  return !isDateAllowed(dayjs(date)); // listedekiler dışındakiler disable
                }}
              />
            </Stack>
          }
          {!!date &&
            (times.length > 0 ? (
              <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
                  Saat Seçiniz{' '}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ width: '100%' }}
                  value={time}
                  label="Age"
                  defaultValue={'Saat seçiniz..'}
                  onChange={(e) => {
                    router.push(pathname + '?' + createQueryString('time', e.target.value));
                  }}
                >
                  {times.map((time, index) => (
                    <MenuItem
                      key={time}
                      value={time}
                      // disabled={!isTimeAllowed(time.split(':')[0], time.split(':')[1])}
                    >
                      {time.split('T')[1].slice(0, 5)}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            ) : (
              <div style={{ textAlign: 'right' }}>Uygun saat bulunamadi.</div>
            ))}

          {durations && durations.length > 0 && (
            <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'items-start', flexDirection: 'row' }}>
              <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
                Dakika Seçiniz{' '}
              </InputLabel>
              <Box sx={{ width: '100%' }}>
                {durations.map((item, index) => (
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
                {totalPrice}₺
              </Typography>
            </Stack>
          )}
          <Stack sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isPending || !time || !alignment || !duration || !date}
            >
              Satin Al
            </Button>
          </Stack>
        </Stack>
      </LocalizationProvider>
    </MainCard>
  );
}
