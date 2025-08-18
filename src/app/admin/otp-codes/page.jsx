// project-imports
import Loader from 'components/Loader';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Table from 'views/table/AdminOtpCodes';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage({ searchParams }) {
  return (
    <Suspense fallback={<Loader />}>
      {' '}
      <Render searchParams={searchParams} />
    </Suspense>
  );
}

async function Render({ searchParams }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let otpCodes = [];

  const params = new URLSearchParams();

  if (searchParams.search) {
    params.append('search', searchParams.search);
  }

  if (searchParams.page) {
    params.append('page', searchParams.page);
  }

  if (searchParams.type) {
    params.append('type', searchParams.type);
  }

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Admin/getOtpListPaged?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      if (res.ok) {
        const data = await res.json();
        otpCodes = data.data;
      }
    } catch (error) {
      console.error('Otp kodlari alınamadı:', error);
    }
  }
  return <Table otpCodes={otpCodes} />;
}
