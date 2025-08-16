// project-imports
import { cookies } from 'next/headers';
import Calendar from 'views/other/AdminCalender';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage({ searchParams }) {
  return <Calendar searchParams={searchParams} />;
}

async function Render({ searchParams }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const expert = searchParams?.expert;
  const day = searchParams?.day;
  const dateObject = new Date(date);

  let expertList = [];
  let days = [];
  let slots = [];

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Admin/experts/forList`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      console.log('res.ok ç');
      if (res.ok) {
        const data = await res.json();
        expertList = data.data;
      }

      //=====================================================================================================//

      if (expertId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Admin/experts/forList`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: 'no-store' // her seferinde güncel veri çekmek için
        });

        if (res.ok) {
          const data = await res.json();
          days = data.data;
        }
      }

      //=====================================================================================================//
      if (expertId && day) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Admin/experts/${expertId}/slots?date=${day}`, {
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
    } catch (error) {
      console.error('Session history alınamadı:', error);
    }
  }
  return <Calendar experts={expertList} days={days} slots={slots} />;
}
