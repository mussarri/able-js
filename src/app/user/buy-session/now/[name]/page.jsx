// project-imports
import { PanoramaSharp } from '@mui/icons-material';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import BuySession from 'views/other/BuySessionNow';
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

  let durations = [];

  if (token) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/Client/GetImmediateAvailability?expertId=${exprertId}&maxDurationMinutes=180`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: 'no-store' // her seferinde güncel veri çekmek için
        }
      );
      if (res.ok) {
        const data = await res.json();
        durations = data.data;
      }
    } catch (error) {
      console.error('Uzman listesi alınamadı:', error);
    }
  }
  return <BuySession durations={durations} />;
}
