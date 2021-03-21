import React from 'react';
import Head from 'next/head';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import Folder from 'components/folder/folder';
import FolderAddIcon from 'components/icons/folderAddIcon';
import MainLayout from 'layouts/main';

const Home = () => {
  const data = new Array(10).fill('');

  return (
    <MainLayout title="Workspace">
      <Grid
        gap={2}
        templateColumns={[
          'repeat(2, 1fr)',
          'repeat(4, 1fr)',
          'repeat(4, 1fr)',
          'repeat(6, 1fr)',
          'repeat(8, 1fr)',
        ]}
      >
        <Flex
          w="150px"
          h="150px"
          direction="column"
          align="center"
          border="1px solid rgba(255, 255, 255, 0.1)"
          borderRadius="lg"
          justify="center"
        >
          <FolderAddIcon w="46px" h="35px" />
          <Text mt={6}>Add project</Text>
        </Flex>
        {data.map((_, key) => (
          <Folder key={key} name="typeracer-flash" />
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Home;
