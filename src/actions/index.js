'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const createMultiSlots = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const slots = JSON.parse(formData.get('slots'));
  try {
    const res = await fetch(process.env.API_URL + 'api/Slot/createSlots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        startTimes: slots
      })
    });

    if (res.status !== 200) throw new Error('Slot olusturulamadi');
    revalidatePath('/admin/calendar');
    revalidatePath('/therapist/calendar');
    return {
      message: 'Slot olusturuldu',
      success: true
    };
  } catch (error) {
    return {
      message: 'Slot olusturulamadi',
      error: true
    };
  }
};

export const creteSlotExpert = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  const startTimes = [];
  let index = 0;

  while (formData.get(`startTimes[${index}]`)) {
    startTimes.push(formData.get(`startTimes[${index}]`));
    index++;
  }

  try {
    const res = await fetch(process.env.API_URL + 'api/Slot/createSlots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        startTimes
      })
    });

    if (res.status !== 200) throw new Error('Slot olusturulamadi');
    revalidatePath('/admin/calendar');
    revalidatePath('/therapist/calendar');
    return {
      message: 'Slot olusturuldu',
      success: true
    };
  } catch (error) {
    return {
      message: 'Slot olusturulamadi',
      error: true
    };
  }
};

export const deleteSlotExpert = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const slotId = formData.get('slotId').toString();
  try {
    const res = await fetch(process.env.API_URL + 'api/Slot/deleteSlot/' + slotId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (res.status !== 200) throw new Error('Slot silinirken hata olustu.');
    revalidatePath('/admin/calendar');
    revalidatePath('/therapist/calendar');
    return {
      message: 'Slot başarıyla silindi.',
      success: true
    };
  } catch (error) {
    return {
      message: 'Slot silinirken hata olustu.',
      error: true
    };
  }
};

export const deleteSlostExpert = async (prev, formData) => {
  const startTimes = JSON.parse(formData.get('startTimes').toString());
  const expertId = formData.get('expertId').toString();
  const slotIds = JSON.parse(formData.get('slotIds').toString());
  try {
    const res = await fetch(process.env.API_URL + '/api/Slots/deleteSlots', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slotIds
      })
    });
    if (res.status !== 200) throw new Error('Slotlar silinirken hata olustu.');
    return {
      message: 'Slotlar başarıyla silindi.',
      success: true
    };
  } catch (error) {
    return {
      message: 'Slotlar silinirken hata olustu.',
      error: true
    };
  }
};
