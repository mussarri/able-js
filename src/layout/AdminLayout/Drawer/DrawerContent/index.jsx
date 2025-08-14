// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';

// project-imports
import NavUser from '../../../DashboardLayout/Drawer/DrawerContent/NavUser';
import NavCard from '../../../DashboardLayout/Drawer/DrawerContent/NavCard';
import Navigation from './Navigation';
import { useGetMenuMaster } from 'api/menu';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <>
          <Navigation />
          {drawerOpen && !downLG && <NavCard />}
        </>
      </SimpleBar>
      <NavUser />
    </>
  );
}
