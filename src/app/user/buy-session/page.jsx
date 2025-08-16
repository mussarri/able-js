// project-imports
import Loader from 'components/Loader';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import List from 'views/other/TherapistList';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage(params) {
  return (
    <Suspense fallback={<Loader />}>
      <RenderPage params={params} />
    </Suspense>
  );
}

async function RenderPage({ params }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let list = [];
  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Client/searchExperts`, {
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
      console.error('Uzman listesi alınamadı:', error);
    }
  }

  return <List list={list} />;
}
