import React from 'react';
import Success from 'views/other/Success';

const page = async ({ searchParams }) => {
  const typeBnd = await searchParams.type;

  return <Success title={typeBnd} />;
};

export default page;
