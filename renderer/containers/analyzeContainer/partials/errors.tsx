import { Alert, AlertDescription } from '@chakra-ui/alert';
import { Box, Text, VStack } from '@chakra-ui/layout';
import Section from 'components/section';
import { ErrorData } from 'interfaces/analyze';
import React from 'react';

interface Errors {
  errors: ErrorData[];
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
                <Text>{item.message}</Text>
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
