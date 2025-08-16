import React from 'react';
import BasicPickers from 'components/BuySessionSelect';
import MainCard from 'components/MainCard';

const BuySession = ({ days, timeList }) => {
  return <BasicPickers days={days} times={timeList} />;
};

export default BuySession;
