import { extendTheme, ThemeOverride } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  radii: {
    md: '4px',
  },
  fonts: {
    body: 'Fira Code',
    heading: 'Fira Code',
    mono: 'Fira Code',
  },
  styles: {
    global: {
      body: {
        color: '#fff',
        bgColor: '#242424',
        p: '50px',
      },
    },
  },
  components: {},
} as ThemeOverride);

export default theme;
