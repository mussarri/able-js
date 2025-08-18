// project-imports
import { cookies } from 'next/headers';
import Table from 'views/table/ExpertSessionHistory';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage({ searchParams }) {
  return <Render searchParams={searchParams} />;
}

async function Render({ searchParams }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let list = [];

  const params = new URLSearchParams();

  if (searchParams.search) {
    params.append('search', searchParams.search);
  }

  if (searchParams.page) {
    params.append('page', searchParams.page);
  }

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Expert/Appointments?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });
      console.log(res);

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
