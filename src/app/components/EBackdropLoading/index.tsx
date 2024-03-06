import * as React from 'react';
import styled from 'styled-components/macro';
import { Portal } from '@mui/base';
import { ELoader } from '../ELoader';
import EBackdrop from '../EBackdrop';
import { zIndex } from 'styles/constants/style';

interface Props {
  isWhiteBackground?: boolean;
  isShow: boolean;
}

const Wrapper = styled.div<Props>`
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  z-index: ${zIndex.modal};
  ${(props) => (!props.isShow ? 'visibility: hidden;' : '')}
`;

const EBackdropLoading: React.FC<Props> = ({ isShow, isWhiteBackground = false }) => {
  return (
    <Portal>
      <Wrapper isShow={isShow} isWhiteBackground={isWhiteBackground}>
        <EBackdrop open={isShow} isWhiteBackground={isWhiteBackground}>
          <ELoader />
        </EBackdrop>
      </Wrapper>
    </Portal>
  );
};
export default React.memo(EBackdropLoading);
