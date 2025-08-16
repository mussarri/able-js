import PropTypes from 'prop-types';
// project-imports
import DashboardLayout from 'layout/DashboardLayout';
import { cookies } from 'next/headers';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default async function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

Layout.propTypes = { children: PropTypes.node };
