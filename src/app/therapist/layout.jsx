import PropTypes from 'prop-types';
// project-imports
import TherapistLayout from 'layout/TherapistLayout';
import AuthGuard from 'utils/route-guard/TherapistGuard';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <TherapistLayout>{children}</TherapistLayout>
    </AuthGuard>
  );
}

Layout.propTypes = { children: PropTypes.node };
