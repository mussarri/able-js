// This is example of menu item without group for horizontal layout. There will be no children.

// assets
import HistoryIcon from '@mui/icons-material/History';
// icons
const icons = {
  sessionHistory: HistoryIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //
//seans satin al
const sessionHistory = {
  title: 'Seans Geçmişi',
  type: 'group',
  url: '/user/session-history',
  icon: icons.sessionHistory
};

export default sessionHistory;
