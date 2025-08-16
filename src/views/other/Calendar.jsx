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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ExpertCreateSlot from 'components/ExpertCreateSlot';
import ExpertDeleteSlot from 'components/ExpertDeleteSlot';
import Selecto from 'react-selecto';
import CreateSlots from 'components/CreateSlots';
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

export default function Calendar({ slots }) {
  const days = getNext30Days();
  const theme = useTheme();
  const [bulk, setBulk] = useState(false);
  const [selected, setSelected] = useState([]);
  const today = new Date();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.push(pathname + '?' + createQueryString('date', today.toISOString().split('T')[0]));
  }, []);

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
    full: {
      borderColor: theme.palette.error.light,
      color: theme.palette.error.main,
      fontWeight: 500
    }
  };

  return (
    <div className="">
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%', overflowX: 'scroll', scrollbarWidth: 'none' }}>
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
            const sx = selected.includes(item.start)
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
                  : {
                      border: '1px solid',
                      textAlign: 'center',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      ...style.full
                    };

            return (
              <Box className={item.status == 2 ? 'div' : ''} sx={sx} key={index} id={item.start} status={item.status}>
                {item.status == 2 && item.start.split('T')[1].slice(0, 5)}
                {/* {item.status == 2 && <ExpertCreateSlot slot={item} /> */}
                {item.status == 0 && <ExpertDeleteSlot slot={item} />}
              </Box>
            );
          })}
        </Box>
        {<CreateSlots slots={selected} setSelected={setSelected} />}
      </div>
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
