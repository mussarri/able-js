import React from 'react';
import { redirect } from 'next/navigation';
const page = () => {
  return redirect('/user/buy-sessions');
};

export default page;
