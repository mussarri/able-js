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
        <Image alt="logo" src="/assets/images/logo/sakin hayat logo.svg" width={50} height={50} />
      ) : (
        <div
          className="relative overflow-hidden"
          style={{
            maxHeight: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
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
            height={100}
            width={200}
            objectFit="contain"
          />
        </div>
      )}
    </ButtonBase>
  );
}

LogoSection.propTypes = { reverse: PropTypes.bool, isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };
