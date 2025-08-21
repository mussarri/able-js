import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  redirect('/user/account-info/personal');
};

export default page;
