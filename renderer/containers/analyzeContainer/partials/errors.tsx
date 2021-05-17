import { Alert, AlertDescription } from '@chakra-ui/alert';
import { Box, Text, VStack } from '@chakra-ui/layout';
import Section from 'components/section';
import React from 'react';
import { ErrorsData } from '../analyzeContainer';

interface Errors {
  errors: ErrorsData[];
}

const Errors: React.FC<Errors> = ({ errors }) => {
  return (
    <Section title="Errors">
      {errors.length ? (
        <VStack spacing={4}>
          {errors.map((item) => (
            <Alert status="error">
              <AlertDescription>
                <Text>
                  <b>Directory:</b> <u>{item.dir}</u>
                </Text>
                <Text>{item.errorMessage}</Text>
              </AlertDescription>
            </Alert>
          ))}
        </VStack>
      ) : (
        <Box>No errors were found.</Box>
      )}
    </Section>
  );
};

export default Errors;
