import PropTypes from 'prop-types';
// project-imports
import TherapistLayout from 'layout/TherapistLayout';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }) {
  return <TherapistLayout>{children}</TherapistLayout>;
}

Layout.propTypes = { children: PropTypes.node };
