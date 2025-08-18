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

export const createMultiSlotsAdmin = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const slots = JSON.parse(formData.get('slots'));
  const expertId = formData.get('expertId').toString();
  try {
    const res = await fetch(process.env.API_URL + 'api/Admin/experts/' + expertId + '/slots', {
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

export const deleteSlotsAdmin = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const slotIds = JSON.parse(formData.get('slotIds'));
  const expertId = formData.get('expertId').toString();
  console.log(slotIds);
  console.log(expertId);

  try {
    const res = await fetch(process.env.API_URL + '/api/Admin/experts/' + expertId + '/slots', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        slotIds
      })
    });
    if (res.status !== 200) throw new Error('Slotlar silinirken hata olustu.');
    revalidatePath('/admin/calendar');
    revalidatePath('/therapist/calendar');
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

export const updateExpertBilling = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const payTrSubMerchantKey = formData.get('payTrSubMerchantKey').toString();
  const iban = formData.get('iban').toString();
  const taxNumber = formData.get('expertId').toString();
  const companyTitle = formData.get('companyTitle').toString();
  const contactPhone = formData.get('contactPhone').toString();

  try {
    const res = await fetch(`${process.env.API_URL}api/expert/billing`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        payTrSubMerchantKey,
        iban,
        taxNumber,
        companyTitle,
        contactPhone
      })
    });

    if (res.status !== 200) throw new Error('Slotlar silinirken hata olustu.');
    revalidatePath('/admin/calendar');
    revalidatePath('/therapist/calendar');
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

export const updateOtp = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
 
  try {
    const res = await fetch(`${process.env.API_URL}api/admin/updateOtp?otpId=${formData.get('otpId')}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
       
    });

    if (res.status !== 200) throw new Error('Slotlar silinirken hata olustu.');
    revalidatePath('/admin/otp-codes');
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

// export const creteSlotExpert = async (prev, formData) => {
//   const cookie = await cookies();
//   const token = cookie.get('token')?.value;

//   const startTimes = [];
//   let index = 0;

//   while (formData.get(`startTimes[${index}]`)) {
//     startTimes.push(formData.get(`startTimes[${index}]`));
//     index++;
//   }

//   try {
//     const res = await fetch(process.env.API_URL + 'api/Slot/createSlots', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         startTimes
//       })
//     });

//     if (res.status !== 200) throw new Error('Slot olusturulamadi');
//     revalidatePath('/admin/calendar');
//     revalidatePath('/therapist/calendar');
//     return {
//       message: 'Slot olusturuldu',
//       success: true
//     };
//   } catch (error) {
//     return {
//       message: 'Slot olusturulamadi',
//       error: true
//     };
//   }
// };
