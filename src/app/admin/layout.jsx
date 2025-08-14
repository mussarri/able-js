import PropTypes from 'prop-types';
// project-imports
import AdminLayout from 'layout/AdminLayout';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}

Layout.propTypes = { children: PropTypes.node };
