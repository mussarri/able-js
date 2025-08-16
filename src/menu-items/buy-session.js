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
  title: 'Seans Satın Al',
  type: 'group',
  url: '/user/buy-session',
  icon: icons.buySession
};

export default buySession;
