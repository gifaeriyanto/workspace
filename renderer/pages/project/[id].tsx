import { Box, Flex, Grid, HStack, Text } from '@chakra-ui/layout';
import {
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Icon,
  Link as CLink,
} from '@chakra-ui/react';
import { exec } from 'child_process';
import { shell } from 'electron';
import ElectronStore from 'electron-store';
import { PackageJson } from 'interfaces/packageJson';
import MainLayout from 'layouts/main';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiPlay } from 'react-icons/hi';

const Home = () => {
  const router = useRouter();
  const toast = useToast();
  const store = new ElectronStore();
  const [projectId, setProjectId] = useState('');
  const [projectDetail, setProjectDetail] = useState<PackageJson>(
    {} as PackageJson,
  );

  useEffect(() => {
    if (router.query?.id) {
      setProjectId(router.query.id as string);
    }
  }, [router]);

  useEffect(() => {
    if (projectId) {
      const data = store.get('projects')[projectId];
      setProjectDetail(data);
    }
  }, [projectId]);

  const item = (field: string, value: React.ReactNode) => (
    <>
      <Box opacity="0.5" mb={4}>
        {field}
      </Box>
      <Box mb={4}>{value}</Box>
    </>
  );

  const handleOpenVSCode = () => {
    exec(`code ${projectDetail.dir}`, (err) => {
      if (err) {
        toast({
          title: 'Cannot open VSCode',
          description: `Please integrate the vscode-cli to your terminal. ${(
            <CLink
              href="#"
              onClick={() =>
                shell.openExternal(
                  'https://code.visualstudio.com/docs/editor/command-line',
                )
              }
            >
              Learn more
            </CLink>
          )}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <>
      <MainLayout
        title={Object.keys(projectDetail).length ? projectDetail?.name : ''}
      >
        {Object.keys(projectDetail).length ? (
          <>
            <Box position="absolute" top="0" right="50px" zIndex="docked">
              <HStack>
                <Link href="/home">
                  <a>
                    <Button>Back to home</Button>
                  </a>
                </Link>
                <Button colorScheme="yellow" onClick={handleOpenVSCode}>
                  Open with VSCode
                </Button>
              </HStack>
            </Box>

            <Breadcrumb mb={8}>
              <BreadcrumbItem opacity="0.5">
                <BreadcrumbLink href="#">
                  <Link href="/home">
                    <a>Home</a>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{projectDetail?.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <Grid templateColumns="200px auto">
              {projectDetail.version && item('Version', projectDetail.version)}
              {projectDetail.description &&
                item('Description', projectDetail.description)}
              {projectDetail.author && item('Author', projectDetail.author)}
              {projectDetail.license && item('License', projectDetail.license)}
              {projectDetail.homepage &&
                item(
                  'Homepage',
                  <CLink
                    href="#"
                    onClick={() => shell.openExternal(projectDetail.homepage)}
                  >
                    {projectDetail.homepage}
                  </CLink>,
                )}
              {projectDetail.scripts &&
                item(
                  'Scripts',
                  Object.keys(projectDetail.scripts).map((key) => (
                    <Flex key={key} mb={4} align="center">
                      <Icon as={HiPlay} color="yellow" mr={2} fontSize="lg" />
                      <Box w="100%">
                        <Text as="span" mr={2}>
                          {key}
                        </Text>
                        <Text
                          as="span"
                          fontSize="sm"
                          opacity="0.5"
                          display="inline-block"
                          verticalAlign="bottom"
                        >
                          {projectDetail.scripts[key]}
                        </Text>
                      </Box>
                    </Flex>
                  )),
                )}
            </Grid>
          </>
        ) : (
          'Loading...'
        )}
      </MainLayout>
    </>
  );
};

export default Home;
