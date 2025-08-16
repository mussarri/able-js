// project-imports
import { cookies } from 'next/headers';
import Table from 'views/table/AdminSessionHistory';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  return <Table />;
}

async function Render() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  const dateObject = new Date(date);
  let sessions = [];

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Admin/getOtpListPaged`, {
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
  return <Table sessions={[]} />;
}
