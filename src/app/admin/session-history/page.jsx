// project-imports
import { cookies } from 'next/headers';
import Table from 'views/table/AdminSessionHistory';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage({ searchParams }) {
  return <Render searchParams={searchParams} />;
}

async function Render({ searchParams }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let sessions = [];
  const params = new URLSearchParams();

  if (searchParams.filter) {
    params.append('filter', searchParams.filter);
  }

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Appointment/getClientAppointments?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      if (res.ok) {
        const data = await res.json();
        sessions = data.data;
      }
    } catch (error) {
      console.error('Otp kodlari alınamadı:', error);
    }
  }
  return <Table sessions={sessions} />;
}
