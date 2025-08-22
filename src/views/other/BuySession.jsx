import React from 'react';
import BasicPickers from 'sections/user/BuySessionSelect';
import MainCard from 'components/MainCard';

const BuySession = ({ days, timeList, durations, prices }) => {
  return <BasicPickers days={days} times={timeList} durations={durations} prices={prices} />;
};

export default BuySession;
