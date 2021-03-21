import { extendTheme, ThemeOverride } from '@chakra-ui/react';
import LinkTheme from 'theme/link';

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  radii: {
    md: '4px',
  },
  fonts: {
    body: 'Fira Code',
    heading: 'Fira Code',
    mono: 'Fira Code',
  },
  fontSizes: {
    sm: '12px',
    md: '14px',
  },
  styles: {
    global: {
      body: {
        color: '#fff',
        bgColor: '#242424',
        fontSize: '14px',
      },
    },
  },
  components: {
    Link: LinkTheme,
  },
} as ThemeOverride);

export default theme;
