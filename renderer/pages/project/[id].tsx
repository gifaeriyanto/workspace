import {
  useDisclosure,
  useToast,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link as CLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { exec } from 'child_process';
import { shell } from 'electron';
import ElectronStore from 'electron-store';
import { PackageJson } from 'interfaces/packageJson';
import MainLayout from 'layouts/main';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiDotsVertical, HiOutlineArrowLeft, HiPlay } from 'react-icons/hi';

const Home = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    exec(
      `"/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ${projectDetail.dir}`,
      (err) => {
        if (err) {
          toast({
            title: 'Cannot open VSCode',
            description: 'Error: ' + JSON.stringify(err),
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      },
    );
  };

  const handleOpenFinder = () => {
    shell.openPath(projectDetail.dir);
  };

  const handleDeleteProject = () => {
    try {
      const projects = store.get('projects') as PackageJson[];
      projects.splice(Number(projectId), 1);
      store.set('projects', projects);
      toast({
        description: 'Project deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        description: 'Delete project failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    router.push('/home');
  };

  if (!Object.keys(projectDetail).length) {
    return <>Loading...</>;
  }

  return (
    <>
      <MainLayout title={projectDetail.name}>
        <>
          <Box position="absolute" top="0" right="50px" zIndex="docked">
            <HStack>
              <Link href="/home">
                <a>
                  <Button leftIcon={<HiOutlineArrowLeft />}>
                    Back to home
                  </Button>
                </a>
              </Link>
              <Button colorScheme="yellow" onClick={handleOpenVSCode}>
                Open with VSCode
              </Button>
              <Menu>
                <MenuButton as={IconButton} icon={<HiDotsVertical />} />
                <MenuList>
                  <MenuItem onClick={handleOpenFinder}>
                    Reveal in Finder
                  </MenuItem>
                  <MenuItem color="orange" onClick={handleDeleteProject}>
                    Delete {projectDetail.name}
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Box>

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

            {projectDetail.dependencies &&
              item(
                'Dependencies',
                <CLink href="#" color="yellow" onClick={onOpen}>
                  Show all dependencies
                </CLink>,
              )}
          </Grid>
        </>
      </MainLayout>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dependencies</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="auto 150px">
              {Object.keys(projectDetail.dependencies).map((key) => (
                <React.Fragment key={key}>
                  {item(key, projectDetail.dependencies[key])}
                </React.Fragment>
              ))}
            </Grid>

            {projectDetail.devDependencies &&
              Object.keys(projectDetail.devDependencies).length && (
                <>
                  <Heading as="h3" fontSize="lg" mt={4} mb={8}>
                    Dev Dependencies
                  </Heading>
                  <Grid templateColumns="auto 150px">
                    {Object.keys(projectDetail.devDependencies).map((key) => (
                      <React.Fragment key={key}>
                        {item(key, projectDetail.devDependencies[key])}
                      </React.Fragment>
                    ))}
                  </Grid>
                </>
              )}

            {projectDetail.peerDependencies &&
              Object.keys(projectDetail.peerDependencies).length && (
                <>
                  <Heading as="h3" fontSize="lg" mt={4} mb={8}>
                    Peer Dependencies
                  </Heading>
                  <Grid templateColumns="auto 150px">
                    {Object.keys(projectDetail.peerDependencies).map((key) => (
                      <React.Fragment key={key}>
                        {item(key, projectDetail.peerDependencies[key])}
                      </React.Fragment>
                    ))}
                  </Grid>
                </>
              )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
