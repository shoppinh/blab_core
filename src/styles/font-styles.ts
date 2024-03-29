// font declare
import RobotoRegularEOT from 'assets/fonts/family/Roboto-Regular.eot';
import RobotoRegularWOFF from 'assets/fonts/family/Roboto-Regular.woff';
import RobotoRegularWOFF2 from 'assets/fonts/family/Roboto-Regular.woff2';
import RobotoRegularTTF from 'assets/fonts/family/Roboto-Regular.ttf';
import RobotoRegularSVG from 'assets/fonts/family/Roboto-Regular.svg';

import RobotoItalicEOT from 'assets/fonts/family/Roboto-Italic.eot';
import RobotoItalicWOFF from 'assets/fonts/family/Roboto-Italic.woff';
import RobotoItalicWOFF2 from 'assets/fonts/family/Roboto-Italic.woff2';
import RobotoItalicTTF from 'assets/fonts/family/Roboto-Italic.ttf';
import RobotoItalicSVG from 'assets/fonts/family/Roboto-Italic.svg';

import RobotoThinEOT from 'assets/fonts/family/Roboto-Thin.eot';
import RobotoThinWOFF from 'assets/fonts/family/Roboto-Thin.woff';
import RobotoThinWOFF2 from 'assets/fonts/family/Roboto-Thin.woff2';
import RobotoThinTTF from 'assets/fonts/family/Roboto-Thin.ttf';
import RobotoThinSVG from 'assets/fonts/family/Roboto-Thin.svg';

import RobotoThinItalicEOT from 'assets/fonts/family/Roboto-ThinItalic.eot';
import RobotoThinItalicWOFF from 'assets/fonts/family/Roboto-ThinItalic.woff';
import RobotoThinItalicWOFF2 from 'assets/fonts/family/Roboto-ThinItalic.woff2';
import RobotoThinItalicTTF from 'assets/fonts/family/Roboto-ThinItalic.ttf';
import RobotoThinItalicSVG from 'assets/fonts/family/Roboto-ThinItalic.svg';

import RobotoBoldEOT from 'assets/fonts/family/Roboto-Bold.eot';
import RobotoBoldWOFF from 'assets/fonts/family/Roboto-Bold.woff';
import RobotoBoldWOFF2 from 'assets/fonts/family/Roboto-Bold.woff2';
import RobotoBoldTTF from 'assets/fonts/family/Roboto-Bold.ttf';
import RobotoBoldSVG from 'assets/fonts/family/Roboto-Bold.svg';

import RobotoBoldItalicEOT from 'assets/fonts/family/Roboto-BoldItalic.eot';
import RobotoBoldItalicWOFF from 'assets/fonts/family/Roboto-BoldItalic.woff';
import RobotoBoldItalicWOFF2 from 'assets/fonts/family/Roboto-BoldItalic.woff2';
import RobotoBoldItalicTTF from 'assets/fonts/family/Roboto-BoldItalic.ttf';
import RobotoBoldItalicSVG from 'assets/fonts/family/Roboto-BoldItalic.svg';

import RobotoBlackEOT from 'assets/fonts/family/Roboto-Black.eot';
import RobotoBlackWOFF from 'assets/fonts/family/Roboto-Black.woff';
import RobotoBlackWOFF2 from 'assets/fonts/family/Roboto-Black.woff2';
import RobotoBlackTTF from 'assets/fonts/family/Roboto-Black.ttf';
import RobotoBlackSVG from 'assets/fonts/family/Roboto-Black.svg';

import RobotoBlackItalicEOT from 'assets/fonts/family/Roboto-BlackItalic.eot';
import RobotoBlackItalicWOFF from 'assets/fonts/family/Roboto-BlackItalic.woff';
import RobotoBlackItalicWOFF2 from 'assets/fonts/family/Roboto-BlackItalic.woff2';
import RobotoBlackItalicTTF from 'assets/fonts/family/Roboto-BlackItalic.ttf';
import RobotoBlackItalicSVG from 'assets/fonts/family/Roboto-BlackItalic.svg';

import RobotoLightEOT from 'assets/fonts/family/Roboto-Light.eot';
import RobotoLightWOFF from 'assets/fonts/family/Roboto-Light.woff';
import RobotoLightWOFF2 from 'assets/fonts/family/Roboto-Light.woff2';
import RobotoLightTTF from 'assets/fonts/family/Roboto-Light.ttf';
import RobotoLightSVG from 'assets/fonts/family/Roboto-Light.svg';

import RobotoLightItalicEOT from 'assets/fonts/family/Roboto-LightItalic.eot';
import RobotoLightItalicWOFF from 'assets/fonts/family/Roboto-LightItalic.woff';
import RobotoLightItalicWOFF2 from 'assets/fonts/family/Roboto-LightItalic.woff2';
import RobotoLightItalicTTF from 'assets/fonts/family/Roboto-LightItalic.ttf';
import RobotoLightItalicSVG from 'assets/fonts/family/Roboto-LightItalic.svg';

import RobotoMediumEOT from 'assets/fonts/family/Roboto-Medium.eot';
import RobotoMediumWOFF from 'assets/fonts/family/Roboto-Medium.woff';
import RobotoMediumWOFF2 from 'assets/fonts/family/Roboto-Medium.woff2';
import RobotoMediumTTF from 'assets/fonts/family/Roboto-Medium.ttf';
import RobotoMediumSVG from 'assets/fonts/family/Roboto-Medium.svg';

import RobotoMediumItalicEOT from 'assets/fonts/family/Roboto-MediumItalic.eot';
import RobotoMediumItalicWOFF from 'assets/fonts/family/Roboto-MediumItalic.woff';
import RobotoMediumItalicWOFF2 from 'assets/fonts/family/Roboto-MediumItalic.woff2';
import RobotoMediumItalicTTF from 'assets/fonts/family/Roboto-MediumItalic.ttf';
import RobotoMediumItalicSVG from 'assets/fonts/family/Roboto-MediumItalic.svg';

import { createGlobalStyle } from 'styled-components/macro';

export const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegularEOT});
    src: url(${RobotoRegularEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoRegularWOFF2}) format('woff2'),
        url(${RobotoRegularWOFF}) format('woff'),
        url(${RobotoRegularTTF}) format('truetype'),
        url(${RobotoRegularSVG}#Roboto) format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBoldItalicEOT});
    src: url(${RobotoBoldItalicEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoBoldItalicWOFF2}) format('woff2'),
        url(${RobotoBoldItalicWOFF}) format('woff'),
        url(${RobotoBoldItalicTTF}) format('truetype'),
        url(${RobotoBoldItalicSVG}#Roboto-BoldItalic) format('svg');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBoldEOT});
    src: url(${RobotoBoldEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoBoldWOFF2}) format('woff2'),
        url(${RobotoBoldWOFF}) format('woff'),
        url(${RobotoBoldTTF}) format('truetype'),
        url(${RobotoBoldSVG}#Roboto-Bold) format('svg');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBlackEOT});
    src: url(${RobotoBlackEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoBlackWOFF2}) format('woff2'),
        url(${RobotoBlackWOFF}) format('woff'),
        url(${RobotoBlackTTF}) format('truetype'),
        url(${RobotoBlackSVG}#Roboto-CondensedBlack) format('svg');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBlackItalicEOT});
    src: url(${RobotoBlackItalicEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoBlackItalicWOFF2}) format('woff2'),
        url(${RobotoBlackItalicWOFF}) format('woff'),
        url(${RobotoBlackItalicTTF}) format('truetype'),
        url(${RobotoBlackItalicSVG}#Roboto-CondensedBlack) format('svg');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoItalicEOT});
    src: url(${RobotoItalicEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoItalicWOFF2}) format('woff2'),
        url(${RobotoItalicWOFF}) format('woff'),
        url(${RobotoItalicTTF}) format('truetype'),
        url(${RobotoItalicSVG}#Roboto-Italic) format('svg');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoLightEOT});
    src: url(${RobotoLightEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoLightWOFF2}) format('woff2'),
        url(${RobotoLightWOFF}) format('woff'),
        url(${RobotoLightTTF}) format('truetype'),
        url(${RobotoLightSVG}#Roboto-Light) format('svg');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoLightItalicEOT});
    src: url(${RobotoLightItalicEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoLightItalicWOFF2}) format('woff2'),
        url(${RobotoLightItalicWOFF}) format('woff'),
        url(${RobotoLightItalicTTF}) format('truetype'),
        url(${RobotoLightItalicSVG}#Roboto-LightItalic) format('svg');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoMediumEOT});
    src: url(${RobotoMediumEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoMediumWOFF2}) format('woff2'),
        url(${RobotoMediumWOFF}) format('woff'),
        url(${RobotoMediumTTF}) format('truetype'),
        url(${RobotoMediumSVG}#Roboto-Medium) format('svg');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoMediumItalicEOT});
    src: url(${RobotoMediumItalicEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoMediumItalicWOFF2}) format('woff2'),
        url(${RobotoMediumItalicWOFF}) format('woff'),
        url(${RobotoMediumItalicTTF}) format('truetype'),
        url(${RobotoMediumItalicSVG}#Roboto-MediumItalic) format('svg');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoThinEOT});
    src: url(${RobotoThinEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoThinWOFF2}) format('woff2'),
        url(${RobotoThinWOFF}) format('woff'),
        url(${RobotoThinTTF}) format('truetype'),
        url(${RobotoThinSVG}#Roboto-Thin) format('svg');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoThinItalicEOT});
    src: url(${RobotoThinItalicEOT}?#iefix) format('embedded-opentype'),
        url(${RobotoThinItalicWOFF2}) format('woff2'),
        url(${RobotoThinItalicWOFF}) format('woff'),
        url(${RobotoThinItalicTTF}) format('truetype'),
        url(${RobotoThinItalicSVG}#Roboto-ThinItalic) format('svg');
    font-weight: 100;
    font-style: italic;
    font-display: swap;
  }
`;
