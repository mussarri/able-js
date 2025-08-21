// project-imports
import Loader from 'components/Loader';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Table from 'views/table/ExpertSessionHistory';

// ==============================|| SAMPLE PAGE ||============================== //

export default async function SamplePage({ searchParams }) {
  return (
    <Suspense fallback={<Loader />}>
      <Render searchParams={await searchParams} />;
    </Suspense>
  );
}

async function Render({ searchParams }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let list = [];

  const params = new URLSearchParams();

  if (searchParams.filter) {
    params.append('filter', searchParams.filter || 0);
  }

  if (searchParams.page) {
    params.append('page', searchParams.page || 1);
  }

  if (searchParams.size) {
    params.append('size', searchParams.size || 10);
  }

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Expert/appointments?${params.toString()}`, {
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
