import {
  useDisclosure,
  useToast,
  Button,
  Checkbox,
  Flex,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import Folder from 'components/folder/folder';
import FolderAddIcon from 'components/icons/folderAddIcon';
import ElectronStore from 'electron-store';
import { PackageJson } from 'interfaces/packageJson';
import MainLayout from 'layouts/main';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { readJSONFile } from 'utils/fs';

interface FilePath extends File {
  path: string;
}

const Home = () => {
  const store = new ElectronStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hint, setHint] = useState(true);
  const [projects, setProjects] = useState<PackageJson[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHint(!!store.get('addProjectHint'));
    if ((store.get('projects') as PackageJson[])?.length) {
      setProjects(store.get('projects') as PackageJson[]);
    }
  }, []);

  useEffect(() => {
    store.set('projects', projects);
  }, [projects]);

  const resetInputValue = () => {
    inputRef.current.value = null;
  };

  const onAddProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0] as FilePath;
    if (file?.name !== 'package.json') {
      toast({
        description: 'Please select package.json in your project',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      resetInputValue();
      return;
    }

    const splitted = file.path.split('/');
    const projectName = splitted[splitted.lastIndexOf('package.json') - 1];

    if (projects.findIndex((project) => project.name === projectName) !== -1) {
      toast({
        description: 'This project already exists',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      resetInputValue();
      return;
    }

    readJSONFile(file.path, (result) => {
      setProjects([
        ...projects,
        {
          ...result,
          name: projectName,
          dir: file.path.replace('/package.json', ''),
        },
      ]);
    });

    resetInputValue();
  };

  const handleAddProject = () => {
    if (hint) {
      onOpen();
    } else {
      inputRef.current.click();
    }
  };

  const handleDontShowHint = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHint(!e.currentTarget.checked);
    store.set('addProjectHint', false);
  };

  return (
    <>
      <MainLayout title="Workspace">
        <Input
          type="file"
          ref={inputRef}
          onChange={onAddProject}
          accept=".json"
          hidden
        />
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
            cursor="pointer"
            onClick={handleAddProject}
          >
            <FolderAddIcon w="46px" h="35px" />
            <Text mt={6}>Add project</Text>
          </Flex>
          {projects.map((project, id) => (
            <Link href={`/project/${id}`} key={project.name}>
              <a>
                <Folder name={project.name} />
              </a>
            </Link>
          ))}
        </Grid>
      </MainLayout>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hint</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Select the <b>package.json</b> to load the project.
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Checkbox fontSize="sm" onChange={handleDontShowHint}>
                Don't show again
              </Checkbox>
              <Button
                onClick={() => {
                  inputRef.current.click();
                  onClose();
                }}
              >
                Okay, I understand
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
