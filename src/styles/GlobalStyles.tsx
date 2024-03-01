import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';
import { FontStyle } from './font-styles';
const CustomStyles = createGlobalStyle({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
    fontFamily: "'Roboto', sans-serif",
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
    <FontStyle />
  </>
);

export default GlobalStyles;
