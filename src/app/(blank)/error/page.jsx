import React from 'react';
import Error from 'views/other/Error';

const page = ({ searchParams }) => {
  const typeBnd = searchParams.type;
  return <Error title={typeBnd} />;
};

export default page;
