import PropTypes from 'prop-types';
// project-imports
import AdminLayout from 'layout/AdminLayout';
import AdminAuthGuard from 'utils/route-guard/AdminGuard';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }) {
  return (
    <AdminAuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthGuard>
  );
}

Layout.propTypes = { children: PropTypes.node };
