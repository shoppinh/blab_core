import React from 'react';
// import TextareaAutosize from '@mui/base/Te';
import { useTranslation } from 'react-i18next';
import { styled } from 'twin.macro';
import { colors } from '../../../styles/constants/colors';
import { pxToRem } from '../../../styles/theme/utils';

export const Input = styled.textarea`
  padding: ${pxToRem(10)}rem ${pxToRem(10)}rem;
  border: ${pxToRem(1)}rem solid ${colors.MINE_SHAFT};
  border-radius: ${pxToRem(10)}rem;
  outline: none;
  font: 400 ${pxToRem(15)}rem / ${pxToRem(18)}rem ${(p) => p.theme.fontFamily};
  width: 100%;
  &:focus-visible {
    outline: none;
  }
`;

const ETextArea = React.forwardRef<any, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
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

export default React.memo(ETextArea);
