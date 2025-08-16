'use client';
import PropTypes from 'prop-types';

// next

// project-imports
import ThemeCustomization from 'themes';
import { ConfigProvider } from 'contexts/ConfigContext';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';

import Snackbar from 'components/@extended/Snackbar';

// ==============================|| PROVIDER WRAPPER  ||============================== //

export default function ProviderWrapper({ children }) {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <RTLLayout>
          <ScrollTop>
            {/* <AuthProvider> */}
            <Snackbar />
            {children}
            {/* </AuthProvider> */}
          </ScrollTop>
        </RTLLayout>
      </ThemeCustomization>
    </ConfigProvider>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.node };
