'use client';
import { OutlinedInput, Stack } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const TherapistListSearch = ({ placeholder }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 1000);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setText(search || '');
  }, []);

  useEffect(() => {
    router.push(pathname + '?' + createQueryString('search', value));
  }, [value]);

  return (
    <Stack sx={{ gap: 1 }}>
      <OutlinedInput value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder || 'Ara..'} fullWidth />
    </Stack>
  );
};

export default TherapistListSearch;
