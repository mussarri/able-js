import React from 'react';
import BasicPickers from 'components/BuySessionSelectNow';
import MainCard from 'components/MainCard';

const BuySession = ({ durations }) => {
  return <BasicPickers durations={durations} />;
};

export default BuySession;
