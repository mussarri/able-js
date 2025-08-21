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
import Selecto from 'react-selecto';
import CreateSlotsAdmin from 'components/CreateSlotsAdmin';
import AdminDeleteSlot from 'components/AdminDeleteSlot';
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

    days.push(date);
  }

  return days;
}

export default function Calendar({ experts, slots }) {
  const days = getNext30Days();
  const theme = useTheme();

  const [selectedTime, setSelectedTime] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const expert = searchParams.get('expert');
  const [selected, setSelected] = useState([]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  console.log(selected);

  const style = {
    unset: {
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.main
    },
    available: {
      borderColor: theme.palette.success.main,
      color: theme.palette.primary.contrastText,
      background: theme.palette.success.light,
      fontWeight: 500
    },
    disabled: {
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.light,
      // background: theme.palette.secondary.light,
      fontWeight: 500
    },
    full: {
      borderColor: theme.palette.error.dark,
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.contrastText,
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
            options={experts}
            getOptionLabel={(option) => `${option.name}`}
            value={experts?.find((i) => i?.expertId == expert)}
            isOptionEqualToValue={(option, value) => option.name === value?.name}
            renderInput={(params) => <TextField {...params} label="Uzman" />}
          />
        </Stack>
      </Box>
      {expert && (
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
          {days.map((item, index) => {
            const day = item.getDate();
            const monthName = item.toLocaleString('tr-TR', { month: 'long' });
            const formatted = `${day} ${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`;
            return (
              <Box
                sx={{
                  minWidth: 'max-content',
                  border: '2px solid',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  borderColor: item.toISOString().split('T')[0] == date ? theme.palette.primary.main : theme.palette.secondary.light,
                  color: item.toISOString().split('T')[0] == date ? theme.palette.primary.main : theme.palette.secondary.main
                }}
                onClick={() => {
                  router.push(pathname + '?' + createQueryString('date', item.toISOString().split('T')[0]));
                }}
                key={index}
              >
                {formatted}
              </Box>
            );
          })}
        </Box>
      )}

      {slots?.length > 0 && (
        <div className="grid">
          <Box
            sx={{
              width: '100%',
              maxWidth: '1050px',
              margin: '100px auto 20px',
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(8, minmax(100px, 1fr))'
            }}
            className={'grid'}
          >
            {/* status 1 == full
              status 2 == unset
              status 3 == disabled
              status 0 == available */}

            {slots.map((item, index) => {
              const sx = selected.includes(item.startTime)
                ? {
                    border: '1px solid',
                    textAlign: 'center',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main
                  }
                : item.status == 2
                  ? {
                      border: '1px solid',
                      textAlign: 'center',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      ...style.unset
                    }
                  : item.status == 0
                    ? {
                        border: '1px solid',
                        textAlign: 'center',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        ...style.available
                      }
                    : item.status == 3
                      ? {
                          border: '1px solid',
                          textAlign: 'center',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          ...style.disabled
                        }
                      : {
                          border: '1px solid',
                          textAlign: 'center',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          ...style.full
                        };

              return (
                <Box className={item.status == 2 ? 'div' : ''} sx={sx} key={index} id={item.startTime} status={item.status}>
                  {item.status != 0 && item.startTime.split('T')[1].slice(0, 5)}
                  {/* {item.status == 2 && <ExpertCreateSlot slot={item} /> */}
                  {item.status == 0 && <AdminDeleteSlot slot={item} expert={experts.find((i) => i.expertId == item.expertId)} />}
                </Box>
              );
            })}
          </Box>
          {<CreateSlotsAdmin expertId={expert} slots={selected} setSelected={setSelected} />}
        </div>
      )}
      <Selecto
        selectableTargets={['.grid .div']}
        hitRate={0} // kutunun biraz üstünden geçse bile seçer
        selectByClick={true}
        selectFromInside={false}
        continueSelect={true}
        toggleContinueSelect={'shift'} // shift basılıyken ekleme/çıkarma
        onSelectEnd={(e) => {
          setSelected(
            e.selected
              .filter((el) => el.nodeName !== 'FORM')
              .filter((el) => el.attributes?.status?.value == 2)
              .map((el) => el.id)
          );
        }}
      />
    </div>
  );
}
