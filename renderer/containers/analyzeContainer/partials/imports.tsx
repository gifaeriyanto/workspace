import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Section from 'components/section';
import { ImportsData } from 'interfaces/analyze';
import React from 'react';

interface Imports {
  data: ImportsData[];
}

const Imports: React.FC<Imports> = ({ data }) => {
  return (
    <Section title="Imported Modules">
      <Box border="1px solid" borderColor="gray.700" borderRadius="base">
        <Table variant="simple" width="100%" overflowWrap="break-word">
          <Thead>
            <Tr>
              <Th color="yellow.500">Modules</Th>
              <Th color="yellow.500" isNumeric minW="200px">
                Imported by (files)
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item[0]}>
                <Td w="80%">{item[0]}</Td>
                <Td isNumeric>{item[1]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Section>
  );
};

export default Imports;
