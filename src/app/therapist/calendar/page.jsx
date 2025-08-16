// project-imports
import Loader from 'components/Loader';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Calendar from 'views/other/Calendar';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage({ searchParams }) {
  const date = searchParams.date;

  return (
    <Suspense fallback={<Loader />}>
      <Render date={date} />
    </Suspense>
  );
}

async function Render({ date }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const dateObject = new Date(date);
  let slots = [];

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Slot/GetSlotsByDate?date=` + dateObject.toISOString(), {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      if (res.ok) {
        const data = await res.json();
        slots = data.data;
      }
    } catch (error) {
      console.error('Session history alınamadı:', error);
    }
  }

  return <Calendar slots={slots} />;
}
