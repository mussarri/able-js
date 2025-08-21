// This is example of menu item without group for horizontal layout. There will be no children.

// assets
import { User } from '@wandersonalwes/iconsax-react';
// icons
const icons = {
  buySession: User
};


// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //
//seans satin al
const sessionHistory = {
  title: 'Hesap Bilgileri',
  type: 'group',
  url: '/therapist/account-info',
  icon: icons.sessionHistory
};

export default sessionHistory;
