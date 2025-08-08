import { redirect } from 'next/navigation';
import React from 'react';

const page = () => {
  redirect('/account-info/settings');
  return <div></div>;
};

export default page;
