import { Box, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React from 'react';

export interface MainLayoutProps {
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>Workspace</title>
      </Head>

      <Box m="50px">
        <Heading fontWeight="normal" mb={10}>
          {title}
        </Heading>
        {children}
      </Box>
    </>
  );
};

export default MainLayout;
