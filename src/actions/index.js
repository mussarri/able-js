'use server';

import { parse } from 'date-fns';
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
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);
    revalidatePath('/admin/calendar');
    revalidatePath('/therapist/calendar');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
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
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);

    
    revalidatePath('/admin/calendar');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
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
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);
    revalidatePath('/admin/calendar');
    revalidatePath('/therapist/calendar');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
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
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);
    revalidatePath('/admin/calendar');
    revalidatePath('/therapist/calendar');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
      error: true
    };
  }
};

export const updateExpertBilling = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  const payTrSubMerchantKey = formData.get('payTrSubMerchantKey').toString();
  const iban = formData.get('iban').toString();
  const companyTitle = formData.get('companyTitle').toString();
  const contactPhone = formData.get('contactPhone').toString();
  const taxNumber = formData.get('taxNumber').toString();
  console.log(formData);

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
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);
    revalidatePath('/admin/calendar');
    revalidatePath('/therapist/account-info');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
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
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);
    revalidatePath('/admin/otp-codes');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
      error: true
    };
  }
};

export const expertChangePassword = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  const currentPassword = formData.get('currentPassword').toString();
  const newPassword = formData.get('newPassword').toString();

  try {
    const res = await fetch(`${process.env.API_URL}api/expert/changePassword=${formData.get('otpId')}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);
    revalidatePath('/therapist/account-info');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
      error: true
    };
  }
};

export const clientChangePassword = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  const currentPassword = formData.get('currentPassword').toString();
  const newPassword = formData.get('newPassword').toString();

  try {
    const res = await fetch(`${process.env.API_URL}api/client/changePassword`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);
    revalidatePath('/user/account-info');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
      error: true
    };
  }
};

export const createAppointmentDrafts = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  const startTime = formData.get('startTime').toString();
  const duration = formData.get('duration');
  const status = formData.get('status');
  const expertId = formData.get('expertId');

  try {
    const res = await fetch(`${process.env.API_URL}/api/Client/createAppointmentDrafts?expertId=${expertId}&status=${status}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        startTime,
        duration: parseInt(duration)
      })
    });
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);

    revalidatePath('/admin');
    revalidatePath('/expert');
    revalidatePath('/user/buy-session');
    revalidatePath('/user/session-history');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
      error: true
    };
  }
};

export const cancelAppoinmentAsyn = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const appointmentId = formData.get('appointmentId').toString();

  try {
    const res = await fetch(process.env.API_URL + '/api/Client/cancelAppoinmentAsync?appointmentId=' + appointmentId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);
    revalidatePath('/admin');
    revalidatePath('/expert');
    revalidatePath('/user/buy-session');
    revalidatePath('/user/session-history');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
      error: true
    };
  }
};

export const bookImmediate = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const expertId = formData.get('expertId').toString();
  const desiredDurationMinutes = formData.get('duration').toString();
  const status = formData.get('status').toString();

  const params = new URLSearchParams({
    expertId,
    desiredDurationMinutes,
    status
  });

  try {
    const res = await fetch(process.env.API_URL + `api/Client/bookImmediate?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);
    revalidatePath('/admin');
    revalidatePath('/expert');
    revalidatePath('/user/buy-session');
    revalidatePath('/user/session-history');
    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    return {
      message: error.message,
      error: true
    };
  }
};

export const clientChangeUsername = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const username = formData.get('userName').toString();
  try {
    const checkUsername = await fetch(process.env.API_URL + `api/Auth/check-username?username=` + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (checkUsername.status !== 200) throw new Error(data.message);

    const res = await fetch(process.env.API_URL + `api/Client/changeUserName?newUserName=` + username, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);

    revalidatePath('/user/account-info');

    return {
      message: data.message,
      success: true
    };
  } catch (error) {
    console.log(error.message);
    return {
      message: error.message,
      error: true
    };
  }
};

export const userUploadImage = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const image = formData.get('file');

  try {
    const formData = new FormData();
    formData.append('file', image);

    const res = await fetch(process.env.API_URL + `api/MediaFile/upload`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();


    if (res.status !== 200) throw new Error(data.message);

    const res2 = await fetch(process.env.API_URL + `api/Auth/addUserProfilePhoto?mediaFileId=` + data.data.id, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });

    const data2 = await res2.json();

    if (res2.status !== 200) throw new Error(data.message);

    revalidatePath('/user/account-info');

    return {
      message: data2.message,
      success: true,
      url: data2.url
    };
  } catch (error) {
    console.log(error.message);

    return {
      message: error.message,
      error: true
    };
  }
};

export const putUploadImage = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const image = formData.get('file');
  const mediaId = formData.get('mediaId').toString();

  try {
    const formData = new FormData();
    formData.append('file', image);

    const res = await fetch(process.env.API_URL + `/api/MediaFile/` + mediaId, {
      method: 'PUT',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);

    revalidatePath('/user/account-info');

    return {
      message: data.message,
      success: true,
      url: data.url
    };
  } catch (error) {
    console.log(error.message);

    return {
      message: error.message,
      error: true
    };
  }
};

export const deleteUploadImage = async (prev, formData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const mediaId = formData.get('mediaId').toString();

  try {
    const res = await fetch(process.env.API_URL + `api/MediaFile/` + mediaId, {
      method: 'DELETE',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);

    revalidatePath('/user/account-info');

    return {
      message: data.message,
      success: true,
      url: data.url
    };
  } catch (error) {
    console.log(error.message);

    return {
      message: error.message,
      error: true
    };
  }
};
