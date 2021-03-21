import { ChakraProvider } from '@chakra-ui/react';
import ElectronStore from 'electron-store';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import theme from 'theme';

const App = ({ Component, pageProps }: AppProps) => {
  const store = new ElectronStore();

  useEffect(() => {
    if (store.get('addProjectHint') === undefined) {
      store.set('addProjectHint', true);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
