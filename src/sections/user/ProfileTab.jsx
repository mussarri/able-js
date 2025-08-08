import { useEffect, useState } from 'react';

// next
import { usePathname, useRouter } from 'next/navigation';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import { CardCoin, Lock, Profile, Setting3 } from '@wandersonalwes/iconsax-react';

function getPathIndex(pathname) {
  let selectedTab = 0;
  switch (pathname) {
    case '/account-info/payment':
      selectedTab = 1;
      break;
    case '/account-info/password':
      selectedTab = 2;
      break;
    case '/account-info/settings':
      selectedTab = 3;
      break;
    case '/account-info/personal':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - BASIC ||============================== //

export default function ProfileTab() {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname || '/'));
  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    router.push(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: 'secondary.main' } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(2, '/account-info/personal')}>
        <ListItemIcon>
          <Profile size={18} />
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(2, '/account-info/payment')}>
        <ListItemIcon>
          <CardCoin size={18} />
        </ListItemIcon>
        <ListItemText primary="Payment" />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2, '/account-info/password')}>
        <ListItemIcon>
          <Lock size={18} />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick(3, '/account-info/settings')}>
        <ListItemIcon>
          <Setting3 size={18} />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </List>
  );
}
