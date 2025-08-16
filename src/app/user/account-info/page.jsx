import { redirect } from 'next/navigation';
import React from 'react';

const page = () => {
  redirect('/user/account-info/personal');
  return <div></div>;
};

export default page;
