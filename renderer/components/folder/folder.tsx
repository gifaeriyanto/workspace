import { Box, Flex, Text } from '@chakra-ui/layout';
import { ComponentWithAs } from '@chakra-ui/system';
import FolderIcon from 'components/icons/folderIcon';
import React from 'react';

export interface FolderProps {
  name: string;
}

const Folder: ComponentWithAs<'svg', FolderProps> = ({ name, ...props }) => {
  return (
    <Flex
      w="150px"
      h="150px"
      textAlign="center"
      overflow="hidden"
      cursor="pointer"
      borderRadius="lg"
      alignItems="center"
      justify="center"
      transition=".1s background-color"
      _hover={{ bgColor: 'rgba(0, 0, 0, 0.5)' }}
      {...props}
    >
      <Box minW={0}>
        <FolderIcon w="120px" h="90px" borderRadius="lg" p={4} />
        <Text
          h="42px"
          css={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {name}
        </Text>
      </Box>
    </Flex>
  );
};

export default Folder;
