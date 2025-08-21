import React from 'react';
import BasicPickers from 'components/BuySessionSelect';
import MainCard from 'components/MainCard';

const BuySession = ({ days, timeList, durations }) => {
  return <BasicPickers days={days} times={timeList} durations={durations} />;
};

export default BuySession;
