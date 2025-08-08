import PropTypes from 'prop-types';
// project-imports
import TherapistLayout from 'layout/TherapistLayout';
import TherapistAuthGuard from 'utils/route-guard/TherapistGuard';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }) {
  return (
    <TherapistAuthGuard>
      <TherapistLayout>{children}</TherapistLayout>
    </TherapistAuthGuard>
  );
}

Layout.propTypes = { children: PropTypes.node };
