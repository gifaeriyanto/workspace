import Icon, { IconProps } from '@chakra-ui/icon';
import { ComponentWithAs } from '@chakra-ui/system';
import React from 'react';

const FolderIcon: ComponentWithAs<'svg', IconProps> = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 104.918 78.688" {...props}>
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#ff7c7c" />
          <stop offset="1" stopColor="#cbde3c" />
        </linearGradient>
      </defs>
      <path
        id="Path_8"
        data-name="Path 8"
        d="M2,17.115A13.115,13.115,0,0,1,15.115,4H47.9L61.016,17.115H93.8a13.115,13.115,0,0,1,13.115,13.115V69.574A13.115,13.115,0,0,1,93.8,82.688H15.115A13.115,13.115,0,0,1,2,69.574Z"
        transform="translate(-2 -4)"
        fill="url(#linear-gradient)"
      />
    </Icon>
  );
};

export default FolderIcon;
