import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import ElectronStore from 'electron-store';
import { PackageJson } from 'interfaces/packageJson';
import MainLayout from 'layouts/main';
import lodash, { uniqBy } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { convertToAst } from 'utils/analyst';
import { findFilesFromDir } from 'utils/fs';

const Analytics: React.FC = () => {
  const router = useRouter();
  const store = new ElectronStore();
  const [projectId, setProjectId] = useState('');
  const [projectDetail, setProjectDetail] = useState<PackageJson>(
    {} as PackageJson,
  );
  const [filesToBeAnalysed, setFilesToBeAnalysed] = useState([]);
  const [importsAnalysed, setImportsAnalysed] = useState([]);

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

  useEffect(() => {
    if (projectDetail.dir) {
      let result = [];
      findFilesFromDir(
        projectDetail.dir,
        ['js', 'jsx', 'ts', 'tsx'],
        (value) => {
          result = [...result, ...value];
        },
      );
      setFilesToBeAnalysed(uniqBy(result, (item) => item));
    }
  }, [projectDetail]);

  useEffect(() => {
    if (filesToBeAnalysed.length) {
      const analysed: {
        [key: string]: number;
      } = {};
      filesToBeAnalysed.forEach((item) => {
        const importsStat = convertToAst(item);
        Object.keys(importsStat).forEach((key) => {
          if (
            Object.keys({
              ...projectDetail.dependencies,
              ...projectDetail.devDependencies,
            }).findIndex((cur) => cur.split('/')[0] === key.split('/')[0]) >= 0
          ) {
            analysed[key] = analysed[key] + 1 || 1;
          }
        });
      });
      const sorted = lodash(analysed)
        .toPairs()
        .orderBy([1], ['desc'])
        .fromPairs()
        .value();
      setImportsAnalysed(Object.entries(sorted));
    }
  }, [filesToBeAnalysed]);

  return (
    <MainLayout
      title="Analytics"
      rightAddon={
        <Link href={`/project/${router.query.id}`}>
          <a>
            <Button leftIcon={<HiOutlineArrowLeft />}>Back</Button>
          </a>
        </Link>
      }
    >
      <Text mb={8}>This feature will show you the schematic of your code.</Text>
      <Heading as="h3" size="md" mb={4} fontWeight="normal">
        Imported Modules
      </Heading>
      <Box border="1px solid" borderColor="gray.700" borderRadius="base">
        <Table
          variant="simple"
          width="100%"
          tableLayout="fixed"
          overflowWrap="break-word"
        >
          <Thead>
            <Tr>
              <Th color="yellow.500">Modules</Th>
              <Th color="yellow.500" isNumeric minW="200px">
                Imported by (files)
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {importsAnalysed.map((item) => (
              <Tr>
                <Td w="80%">{item[0]}</Td>
                <Td isNumeric>{item[1]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </MainLayout>
  );
};

export default Analytics;
