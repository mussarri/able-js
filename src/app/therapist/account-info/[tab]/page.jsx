import Loader from 'components/Loader';
import { cookies } from 'next/headers';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import TherapistInfo from 'views/other/AccontInfoTherapist';

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }) {
  const { tab } = await params;

  return (
    <Suspense fallback={<Loader />}>
      <Render tab={tab} />;
    </Suspense>
  );
}

async function Render({ tab }) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  let info = {};

  const personalRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Expert/personalInformation`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: 'no-store'
  });

  const personalData = await personalRes.json();
  info = { personalInfo: personalData.data };

  if (tab == 'invoice' && token) {
    try {
      const [res, res2] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Expert/billing`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: 'no-store'
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}api/Expert/payInfo`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: 'no-store'
        })
      ]);

      if (!res.ok || !res2.ok) {
        throw new Error('API isteklerinden biri başarısız oldu');
      }

      const [billingData, payInfoData] = await Promise.all([res.json(), res2.json()]);
      info = { ...info, billing: billingData.data, payInfo: payInfoData.data };
    } catch (error) {
      console.error('Session history alınamadı:', error);
    }
  }
  return <TherapistInfo tab={tab} info={info} />;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const response = ['personal', 'password', 'invoice'];

  return response.map((tab) => ({
    tab: tab
  }));
}

Page.propTypes = { params: PropTypes.object };
