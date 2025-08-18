// project-imports
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Table from 'views/table/AdminActiveUsers';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage({ searchParams }) {
  return (
    <Suspense>
      <Render searchParams={searchParams} />
    </Suspense>
  );
}

async function Render({ searchParams }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let users = [];

  const params = new URLSearchParams();

  if (searchParams.search) {
    params.append('search', searchParams.sort);
  }

  if (searchParams.type) {
    params.append('type', searchParams.type);
  }
  if (searchParams.page) {
    params.append('page', searchParams.page);
  }

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Admin/getActiveUsersPaged?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      if (res.ok) {
        const data = await res.json();
        users = data.data;
      }
    } catch (error) {
      console.error('Session history alınamadı:', error);
    }
  }
  return <Table users={users} />;
}
