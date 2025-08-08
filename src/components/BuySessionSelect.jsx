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

// project-imports
import MainCard from 'components/MainCard';
import { Autocomplete, Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { maxWidth } from '@mui/system';
// ==============================|| DATE PICKER - BASIC ||============================== //

export default function BasicDateTimePickers() {
  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

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
              options={[]}
              renderInput={(params) => <TextField {...params} label="Uzman" />}
            />
          </Stack>
          <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
              Tarih Seçiniz{' '}
            </InputLabel>
            <DesktopDatePicker sx={{ width: '100%' }} format="MM/dd/yyyy" value={value} onChange={(newValue) => setValue(newValue)} />
          </Stack>
          <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
              Saat Seçiniz{' '}
            </InputLabel>
            <TimePicker sx={{ width: '100%' }} value={value} onChange={(newValue) => setValue(newValue)} />
          </Stack>
          <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'items-start', flexDirection: 'row' }}>
            <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
              Süre Seçiniz{' '}
            </InputLabel>
            <DurationPicker onChange={() => {}} initialDuration={{ hours: 1, minutes: 0 }} />
          </Stack>
          <Stack sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Button variant="contained" color="primary">
              Ara
            </Button>
          </Stack>
        </Stack>
      </LocalizationProvider>
    </MainCard>
  );
}
