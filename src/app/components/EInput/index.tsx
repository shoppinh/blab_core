import InputUnstyled from '@mui/base/InputUnstyled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from 'styles/constants/colors';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';

export const Input = styled(InputUnstyled)`
  padding: ${pxToRem(10)}rem ${pxToRem(10)}rem;
  border: ${pxToRem(1)}rem solid ${colors.MINE_SHAFT};
  border-radius: ${pxToRem(10)}rem;
  outline: none;
  font: 400 ${pxToRem(15)}rem / ${pxToRem(18)}rem ${(p) => p.theme.fontFamily};

  & input:focus-visible {
    outline: none;
  }
  width: 100%;
  & input {
    width: 100%;
  }
`;

const PInput = React.forwardRef<any, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ disabled, className, ...rest }, ref) => {
    const { t } = useTranslation();
    return (
      <Input
        ref={ref}
        className={className}
        disabled={disabled}
        placeholder={t('common.defaultInputPlaceholder') as string}
        {...rest}
      />
    );
  }
);

export default React.memo(PInput);
