// This is example of menu item without group for horizontal layout. There will be no children.

// assets
import { Profile2User } from '@wandersonalwes/iconsax-react';
// icons
const icons = {
  buySession: Profile2User
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //
//seans satin al
const buySession = {
  title: 'Aktif Kullanıcılar',
  type: 'group',
  url: '/admin/active-users',
  icon: icons.buySession
};

export default buySession;
