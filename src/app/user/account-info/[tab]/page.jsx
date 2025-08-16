import { cookies } from 'next/headers';
import PropTypes from 'prop-types';
import UserProfile from 'views/other/AccontInfo';

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }) {
  const { tab } = await params;
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

  return <UserProfile tab={tab} user={user} />;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const response = ['personal', 'password', 'invoice'];

  return response.map((tab) => ({
    tab: tab
  }));
}

Page.propTypes = { params: PropTypes.object };
