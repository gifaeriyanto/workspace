import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

export interface SectionProps {
  title: string;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <Box w="100%" mb={8}>
      <Heading as="h3" size="md" mb={4} fontWeight="normal">
        {title}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );
};

export default Section;
