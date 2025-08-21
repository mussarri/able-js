// This is example of menu item without group for horizontal layout. There will be no children.

// assets
import { Verify } from '@wandersonalwes/iconsax-react';
// icons
const icons = {
  buySession: Verify
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //
//seans satin al
const buySession = {
  title: 'OTP Kodlari',
  type: 'group',
  url: '/admin/otp-codes',
  icon: icons.buySession
};

export default buySession;
