import React from 'react';
import BasicPickers from 'sections/user/BuySessionSelectNow';
import MainCard from 'components/MainCard';

const BuySession = ({ durations, prices }) => {
  return <BasicPickers durations={durations} prices={prices} />;
};

export default BuySession;
