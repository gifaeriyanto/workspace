import { Icon, IconProps, ComponentWithAs } from '@chakra-ui/react';
import React from 'react';

const FolderAddIcon: ComponentWithAs<'svg', IconProps> = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 45.604 34.203" {...props}>
      <g id="Group_2" data-name="Group 2" transform="translate(-2 -4)">
        <path
          id="Path_4"
          data-name="Path 4"
          d="M2,9.7A5.7,5.7,0,0,1,7.7,4H21.952l5.7,5.7H41.9a5.7,5.7,0,0,1,5.7,5.7V32.5a5.7,5.7,0,0,1-5.7,5.7H7.7A5.7,5.7,0,0,1,2,32.5Z"
          fill="rgba(255,255,255,0.5)"
        />
        <path
          id="Path_5"
          data-name="Path 5"
          d="M8,14.7H19.4M13.7,9V20.4"
          transform="translate(11.102 9.251)"
          stroke="#242424"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </Icon>
  );
};

export default FolderAddIcon;
