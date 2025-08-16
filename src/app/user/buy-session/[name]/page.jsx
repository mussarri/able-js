// project-imports
import { PanoramaSharp } from '@mui/icons-material';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import BuySession from 'views/other/BuySession';
import Loader from 'components/Loader';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage({ params, searchParams }) {
  const name = params.name;
  const date = searchParams.date;
  const newDate = new Date(date);
  const formattedDate = date ? newDate.toISOString() : '';

  return (
    <Suspense fallback={<Loader />}>
      <RenderPage exprertId={name} date={formattedDate} />;
    </Suspense>
  );
}

export async function RenderPage({ exprertId, date }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let list = [];
  let timeList = [];
  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Client/getAvailableDays/` + exprertId, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      if (date) {
        const resTime = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/Client/getAvailableSlots?expertId=` + exprertId + '&day=' + date,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            cache: 'no-store' // her seferinde güncel veri çekmek için
          }
        );

        if (resTime.ok) {
          const data = await resTime.json();
          timeList = data.data.filter((item) => item.isAvailable === true).map((item) => item.startTime);
        }
      }

      if (res.ok) {
        const data = await res.json();
        list = data.data.filter((item) => item.isAvailable === true);
      }
    } catch (error) {
      console.error('Uzman listesi alınamadı:', error);
    }
  }
  return <BuySession days={list} timeList={timeList} />;
}
