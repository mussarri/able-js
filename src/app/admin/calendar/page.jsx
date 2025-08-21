// project-imports
import Loader from 'components/Loader';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Calendar from 'views/other/AdminCalender';

// ==============================|| SAMPLE PAGE ||============================== //

export default async function SamplePage({ searchParams }) {
  return (
    <Suspense fallback={<Loader />}>
      <Render searchParams={await searchParams} />
    </Suspense>
  );
}

async function Render({ searchParams }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const expert = searchParams?.expert;
  const date = searchParams?.date;
  const dateObject = new Date(date);

  let expertList = [];
  let days = [];
  let slots = [];

  if (token) {
    const res = await fetch(`${process.env.API_URL}api/Admin/experts/forList`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: 'no-store' // her seferinde güncel veri çekmek için
    });

    if (res.ok) {
      const data = await res.json();
      expertList = data.data;
    }

    //=====================================================================================================//
    if (expert && date) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Admin/experts/${expert}/slots?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      if (res.ok) {
        const data = await res.json();
        slots = data.data;
      }
    }
  }
  return <Calendar experts={expertList} slots={slots} />;
}
