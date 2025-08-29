// project-imports
import { PanoramaSharp } from '@mui/icons-material';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import BuySession from 'views/other/BuySession';
import Loader from 'components/Loader';

// ==============================|| SAMPLE PAGE ||============================== //

export default async function SamplePage({ params, searchParams }) {
  const name = (await params).name;

  return (
    <Suspense fallback={<Loader />}>
      <RenderPage exprertId={name} searchParams={await searchParams} />
    </Suspense>
  );
}

export async function RenderPage({ exprertId, searchParams }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const newDate = new Date(searchParams.date);

  const formattedDate = searchParams.date ? newDate.toISOString() : '';

  let list = [];
  let timeList = [];
  let durations = [];
  let prices = {};

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Client/getAvailableDays/` + exprertId, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      const resPrice = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Client/getExpertPrice?expertId=` + exprertId, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store'
      });

      if (res.ok) {
        const data = await res.json();
        list = data.data.filter((item) => item.isAvailable === true);
      }
   

      if (resPrice.ok) {
        const data = await resPrice.json();
        prices = data.data;
      }

      if (searchParams?.date) {
        const resTime = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/Client/getAvailableSlots?expertId=` + exprertId + '&day=' + formattedDate,
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

          if (searchParams?.time) {
            const durationRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/Client/getDurationsFromSlotAsync?expertId=` +
                exprertId +
                '&startTurkey=' +
                searchParams?.time,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                },
                cache: 'no-store' // her seferinde güncel veri çekmek için
              }
            );

            if (durationRes.ok) {
              const data = await durationRes.json();
              durations = data.data.availableDurations;
            }
          }
        }
      }
    } catch (error) {
      console.error('Uzman listesi alınamadı:', error);
    }
  }
  return <BuySession days={list} timeList={timeList} durations={durations} prices={prices} />;
}
