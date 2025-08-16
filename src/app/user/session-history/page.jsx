// project-imports
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Table from 'views/table/SortingTable';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage({ searchParams }) {
  const filter = searchParams.filter;

  return (
    <Suspense>
      <Render />
    </Suspense>
  );
}

async function Render({ filter }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let list = [];

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Client/getAppointments`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      if (res.ok) {
        const data = await res.json();
        list = data.data;
      }
    } catch (error) {
      console.error('Session history alınamadı:', error);
    }
  }

  return <Table list={list} />;
}
