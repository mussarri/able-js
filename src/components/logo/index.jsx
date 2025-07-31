import PropTypes from 'prop-types';
// next
import Link from 'next/link';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project-imports
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from 'config';
import Image from 'next/image';

export default function LogoSection({ reverse, isIcon, sx, to }) {
  return (
    <ButtonBase disableRipple component={Link} href={!to ? APP_DEFAULT_PATH : to} sx={sx}>
      {isIcon ? (
        <Image alt="logo" src="/assets/images/logo/sakin hayat logo.svg" width={50} height={50} />
      ) : (
        <Image alt="logo" src="/assets/images/logo/sakin hayat logo.svg" width={50} height={50} />
      )}
    </ButtonBase>
  );
}

LogoSection.propTypes = { reverse: PropTypes.bool, isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };
