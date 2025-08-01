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

export default function LogoSection({ reverse, isIcon, sx, to, mode }) {
  return (
    <ButtonBase disableRipple component={Link} href={!to ? APP_DEFAULT_PATH : to} sx={sx}>
      {isIcon ? (
        <Image alt="logo" src="/assets/images/logo/sakin hayat logo.svg" width={30} height={30} />
      ) : (
        <div
          className="relative overflow-hidden"
          style={{
            height: 50,
            maxHeight: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20
          }}
        >
          <Image
            alt="logo"
            src={
              mode === 'light'
                ? '/assets/images/logo/sakin hayat logo-black.svg'
                : mode === 'dark'
                  ? '/assets/images/logo/sakin hayat logo-white.svg'
                  : ''
            }
            width={150}
            height={60}
            objectFit="contain"
          />
        </div>
      )}
    </ButtonBase>
  );
}

LogoSection.propTypes = { reverse: PropTypes.bool, isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };
