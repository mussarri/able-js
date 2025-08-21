// This is example of menu item without group for horizontal layout. There will be no children.

// assets
import { Calendar } from '@wandersonalwes/iconsax-react';
// icons
const icons = {
  buySession: Calendar
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //
//seans satin al
const buySession = {
  title: 'Takvim',
  type: 'group',
  url: '/therapist/calendar',
  icon: icons.buySession
};

export default buySession;
