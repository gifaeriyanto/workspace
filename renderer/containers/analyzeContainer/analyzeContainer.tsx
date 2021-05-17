import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import Errors from 'containers/analyzeContainer/partials/errors';
import Imports from 'containers/analyzeContainer/partials/imports';
import ElectronStore from 'electron-store';
import { PackageJson } from 'interfaces/packageJson';
import MainLayout from 'layouts/main';
import lodash, { uniqBy } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { convertToAst } from 'utils/analyze';
import { findFilesFromDir } from 'utils/fs';

export interface ErrorsData {
  dir: string;
  errorMessage: string;
}

export type ImportsData = [string, number];

const AnalyzeContainer: React.FC = () => {
  const router = useRouter();
  const store = new ElectronStore();
  const [projectId, setProjectId] = useState('');
  const [projectDetail, setProjectDetail] = useState<PackageJson>(
    {} as PackageJson,
  );
  const [filesToBeAnalyzed, setFilesToBeAnalyzed] = useState([]);
  const [importsAnalyzed, setImportsAnalyzed] = useState<ImportsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<ErrorsData[]>([]);

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
      setFilesToBeAnalyzed(uniqBy(result, (item) => item));
    }
  }, [projectDetail]);

  useEffect(() => {
    if (filesToBeAnalyzed.length) {
      const analyzed: {
        [key: string]: number;
      } = {};
      filesToBeAnalyzed.forEach((item) => {
        const importsStat = convertToAst(item);
        Object.keys(importsStat).forEach((key) => {
          if (key === 'error') {
            setErrors([
              ...errors,
              {
                dir: item,
                errorMessage: importsStat[key] as string,
              },
            ]);
          }

          if (
            Object.keys({
              ...projectDetail.dependencies,
              ...projectDetail.devDependencies,
            }).findIndex((cur) => cur.split('/')[0] === key.split('/')[0]) >= 0
          ) {
            analyzed[key] = analyzed[key] + 1 || 1;
          }
        });
      });
      const sorted = lodash(analyzed)
        .toPairs()
        .orderBy([1], ['desc'])
        .fromPairs()
        .value();
      setImportsAnalyzed(Object.entries(sorted));
      setIsLoading(false);
    }
  }, [filesToBeAnalyzed]);

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

      {isLoading ? (
        <Flex h="200px" align="center" justify="center">
          <Spinner mr={4} size="sm" />
          <Box>Analyzing...</Box>
        </Flex>
      ) : (
        <>
          <Errors errors={errors} />
          <Imports data={importsAnalyzed} />
        </>
      )}
    </MainLayout>
  );
};

export default AnalyzeContainer;
