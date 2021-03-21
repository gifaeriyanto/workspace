import { Box, Text } from '@chakra-ui/layout';
import { ComponentWithAs } from '@chakra-ui/system';
import FolderIcon from 'components/icons/folderIcon';
import React from 'react';

export interface FolderProps {
  name: string;
}

const Folder: ComponentWithAs<'svg', FolderProps> = ({ name, ...props }) => {
  return (
    <Box
      w="150px"
      h="150px"
      {...props}
      textAlign="center"
      border="16px solid transparent"
      overflow="hidden"
      cursor="pointer"
      borderRadius="lg"
      transition=".1s background-color"
      _hover={{ bgColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <FolderIcon w="80px" h="60px" mb={3} mt={1} />
      <Text>{name}</Text>
    </Box>
  );
};

export default Folder;
