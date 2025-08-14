// project-imports
import mockData, { range } from 'utils/mock-data';
import { Gender } from 'config';

function newRecord(index) {
  const date = new Date('02 11 2022');
  const date2 = new Date('12 12 2022');

  return {
    id: index,
    therapist: 'Ahmet',
    patient: 'Hakan',
    purchasedAt: date,
    seansAt: date2,
    time: 30,
    price: 1000,
    status: 'Tamamlandı'
  };
}
function newRecordOtp(index) {
  const date = new Date('02 11 2022');
  const date2 = new Date('12 12 2022');

  return {
    id: index,
    rumuz: 'ahmet10',
    firstname: 'Ahmet',
    lastname: 'Yilmaz',
    phone: '+905554443322',
    role: 'patient',
    createdAt: date,
    otp: '788345',
    cause: 'Parola Yenileme'
  };
}
// ===========================|| TABLE - USERS ||=========================== //

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newRecord(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}

export function makeDataOtp(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newRecordOtp(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
