'use client';

import { useCallback, useState } from 'react';

// material-ui
import Stack from '@mui/material/Stack';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DurationPicker from 'react-duration-picker';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// ==============================|| DATE PICKER - BASIC ||============================== //

import { School, Videocam } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import { useEffect } from 'react';

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

export default function BasicDateTimePickers({ days, times }) {
  const theme = useTheme();
  const today = dayjs();
  const maxDate = today.add(30, 'day');
  // const allowedDates = ['2025-08-15', '2025-08-20', '2025-08-25'].map((dateStr) => dayjs(dateStr));
  var currentdate = new Date();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const date = searchParams.get('date');
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
  // const isTimeAllowed = (hour, minute) => {
  //   const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  //   return allowedStartTimes.includes(timeStr);
  // };

  const [day, setDay] = useState(today);
  const [time, setTime] = useState();

  const [duration, setDuration] = useState();
  const availableDurations = ['30 dk', '60 dk', '90 dk', '120 dk', '150 dk'].slice(0, countConsecutiveFreeSlots(times, time));
  const [alignment, setAlignment] = useState('one');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
              <ToggleButton value="sesli1" aria-label="first">
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
                    600₺
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

              <ToggleButton value="video0" aria-label="second">
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
                    600₺
                  </Typography>
                  <Typography variant="subtitle2" textAlign="center" fontWeight={'lighter'} className="text">
                    Görüntülü 30dk
                  </Typography>
                </div>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          {type == 'now' || (
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
          )}
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
                    console.log(e.target.value);
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
          {time && (
            <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'items-start', flexDirection: 'row' }}>
              <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
                Süre Seçiniz{' '}
              </InputLabel>
              <Box sx={{ width: '100%' }}>
                {availableDurations.map((item) => (
                  <Button variant={duration == item ? 'contained' : 'text'} value={item} key={item} onClick={() => setDuration(item)}>
                    {item}
                  </Button>
                ))}
              </Box>
            </Stack>
          )}
          <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'justify-between', flexDirection: 'row' }}>
            <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
              Tutar{' '}
            </InputLabel>
            <Typography variant="h6" fontWeight="bold" sx={{ width: '100%', textAlign: 'right' }}>
              1000TL
            </Typography>
          </Stack>
          <Stack sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Button variant="contained" color="primary">
              Satin Al
            </Button>
          </Stack>
        </Stack>
      </LocalizationProvider>
    </MainCard>
  );
}
