'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import SpeedDial from '@mui/material/SpeedDial';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// assets
import { Add } from '@wandersonalwes/iconsax-react';
import times from 'utils/times';
import Button from '@mui/material/Button';
import { fontWeight, minWidth } from '@mui/system';
import { Autocomplete, Input, InputLabel, Stack, TextField } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// ==============================|| CALENDAR - MAIN ||============================== //
function getNext30Days() {
  const days = [];
  const today = new Date();

  for (let i = 0; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const day = date.getDate();
    const monthName = date.toLocaleString('tr-TR', { month: 'long' });
    const formatted = `${day} ${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`;

    days.push(formatted);
  }

  return days;
}

export default function Calendar({ experts, days, slots }) {
  const days30 = getNext30Days();
  const theme = useTheme();
  console.log(experts);

  const [selectedTime, setSelectedTime] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const expert = searchParams.get('expert');
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const style = {
    unset: {
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.main
    },
    available: {
      borderColor: theme.palette.success.main,
      color: theme.palette.success.dark,
      background: theme.palette.success.lighter,
      fontWeight: 500
    },
    full: {
      borderColor: theme.palette.error.light,
      color: theme.palette.error.main,
      fontWeight: 500
    }
  };

  return (
    <div className="">
      <Box
        sx={{
          width: '100%',
          marginTop: '0px'
        }}
      >
        <Stack sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <InputLabel sx={{ minWidth: 130 }} htmlFor="email-login">
            Uzman Seçiniz{' '}
          </InputLabel>
          <Autocomplete
            sx={{ width: '100%' }}
            fullWidth
            onChange={(_, newValue) => {
              router.push(pathname + '?' + createQueryString('expert', newValue.expertId));
            }}
            disablePortal
            id="basic-autocomplete-label"
            options={[
              { name: 'option1', value: 'value1' },
              { name: 'option2', value: 'value2' }
            ]}
            getOptionLabel={(option) => `${option.name}`}
            isOptionEqualToValue={(option, value) => option.name === value?.name}
            renderInput={(params) => <TextField {...params} label="Uzman" />}
          />
        </Stack>
      </Box>
      {false && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            width: '100%',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            marginTop: '40px'
          }}
        >
          {days30.map((item, index) => (
            <Box
              sx={{
                minWidth: 'max-content',
                border: '2px solid',
                borderRadius: '10px',
                padding: '12px 24px',
                cursor: 'pointer',
                borderColor: item == date ? theme.palette.primary.main : theme.palette.secondary.light,
                color: item == date ? theme.palette.primary.main : theme.palette.secondary.main
              }}
              onClick={() => {
                router.push(pathname + '?' + createQueryString('date', item.toISOString().split('T')[0]));
              }}
              key={index}
            >
              {item}
            </Box>
          ))}
        </Box>
      )}

      <Box
        sx={{
          width: '100%',
          maxWidth: '1050px',
          margin: '50px auto 20px',
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(8, minmax(100px, 1fr))'
        }}
      >
        {times.map((item, index) => {
          const sx =
            Math.random() > 0.66
              ? {
                  border: '1px solid',
                  textAlign: 'center',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  ...style.unset
                }
              : Math.random() > 0.33
                ? {
                    border: '1px solid',
                    textAlign: 'center',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    ...style.available
                  }
                : {
                    border: '1px solid',
                    textAlign: 'center',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    ...style.full
                  };
          return (
            <Box sx={sx} onClick={() => setSelectedTime(item)} key={index}>
              <span style={{ minWidth: 140 }}> {times[index] + '-' + (times[index + 1] ? times[index + 1] : times[0])}</span>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          textAlign: 'right',
          margin: '0px 0',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button>Kaydet</Button>
      </Box>
    </div>
  );
}
