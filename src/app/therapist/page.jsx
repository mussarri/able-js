import React from 'react';
import { redirect } from 'next/navigation';
const page = () => {
  redirect('/therapist/calendar');
  return <div>page</div>;
};

export default page;
