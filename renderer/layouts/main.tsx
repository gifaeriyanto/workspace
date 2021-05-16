import { Box, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

export interface MainLayoutProps {
  title: string;
  rightAddon?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  rightAddon,
  children,
}) => {
  return (
    <>
      <Head>
        <title>Workspace</title>
      </Head>

      <Box m="50px">
        <Flex justify="space-between">
          <Heading fontWeight="normal" mb={10}>
            {title}
          </Heading>
          <Box ml={4}>{rightAddon}</Box>
        </Flex>
        {children}
      </Box>
    </>
  );
};

export default MainLayout;
