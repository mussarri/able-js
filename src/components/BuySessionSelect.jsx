'use client';

import { useState } from 'react';

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
import { Autocomplete, Button, MenuItem, Select, Tab, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { Box, maxWidth } from '@mui/system';
import times from 'utils/times';
import { TabList } from '@mui/lab';
// ==============================|| DATE PICKER - BASIC ||============================== //

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

export default function BasicDateTimePickers() {
  const today = dayjs();
  const maxDate = today.add(30, 'day');
  const allowedDates = ['2025-08-15', '2025-08-20', '2025-08-25'].map((dateStr) => dayjs(dateStr));

  // Tarihin seçilebilir olup olmadığını kontrol eden fonksiyon
  const isDateAllowed = (date) => {
    return allowedDates.some((allowedDate) => allowedDate.isSame(date, 'day'));
  };

  const allowedStartTimes = ['08:00', '08:30', '09:00', '10:30', '14:00', '15:30'];
  const isTimeAllowed = (hour, minute) => {
    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return allowedStartTimes.includes(timeStr);
  };

  const [value, setValue] = useState(today);
  const [time, setTime] = useState();
  const [duration, setDuration] = useState();
  const availableDurations = ['30 dk', '60 dk', '90 dk', '120 dk', '150 dk'].slice(0, countConsecutiveFreeSlots(allowedStartTimes, time));

  return (
    <MainCard sx={{ maxWidth: 700 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack sx={{ gap: 3 }}>
          <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
              Uzman Seçiniz{' '}
            </InputLabel>
            <Autocomplete
              sx={{ width: '100%' }}
              fullWidth
              disablePortal
              id="basic-autocomplete-label"
              options={['uzman1', 'uzman2']}
              renderInput={(params) => <TextField {...params} label="Uzman" />}
            />
          </Stack>
          <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
              Tarih Seçiniz{' '}
            </InputLabel>
            <DesktopDatePicker
              sx={{ width: '100%' }}
              format="MM/dd/yyyy"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              shouldDisableDate={(date) => {
                if (!date) return true; // null ise disable
                return !isDateAllowed(dayjs(date)); // listedekiler dışındakiler disable
              }}
            />
          </Stack>
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
              onChange={(e) => setTime(e.target.value)}
            >
              {times.map((time, index) => (
                <MenuItem key={time} value={time} disabled={!isTimeAllowed(time.split(':')[0], time.split(':')[1])} s>
                  {times[index]}-{times[index + 1]}
                </MenuItem>
              ))}
            </Select>
          </Stack>
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
