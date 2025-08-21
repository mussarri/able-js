// project-imports
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Login from 'views/authentication/Login';

// ==============================|| HOME PAGE ||============================== //

export default async function HomePage() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let user = null;
  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      if (res.ok) {
        const data = await res.json();
        user = data.data;
      }
    } catch (error) {
      console.error('Kullanıcı bilgisi alınamadı:', error);
    }
  }

  if (!user) return redirect('/login');
  if (user.role == 1) return redirect('/admin/calendar');
  if (user.role == 2) return redirect('/therapist/calendar');
  if (user.role == 3) return redirect('/user/buy-session');
  // return <Login />;
}
