import React from 'react';
import { redirect } from 'next/navigation';
const page = () => {
  return redirect('/admin/calendar');
};

export default page;
