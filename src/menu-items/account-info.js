// This is example of menu item without group for horizontal layout. There will be no children.

// assets
import { CardPos } from '@wandersonalwes/iconsax-react';
import HistoryIcon from '@mui/icons-material/History';
// icons
const icons = {
  buySession: CardPos
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //
//seans satin al
const buySession = {
  id: 'account-info',
  title: 'Hesap Bilgileri',
  type: 'group',
  url: '/account-info',
  icon: icons.buySession
};

export default buySession;
