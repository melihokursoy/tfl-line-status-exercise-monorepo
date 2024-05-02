import React, { ReactNode } from 'react';
import { StyledUl, StyledH1 } from './styles';
import {
  LineStatusListItem,
  LineStatusListItemProps,
} from './lineStatusListItem';

export interface LineStatusListtProps {
  title?: string;
  items?: LineStatusListItemProps[];
}

export const LineStatusList: React.FC<LineStatusListtProps> = ({
  title = 'Status Updates',
  items,
}) => {
  return (
    <>
      <StyledH1>{title}</StyledH1>
      <StyledUl>
        {items?.map((i) => (
          <LineStatusListItem {...i} />
        ))}
      </StyledUl>
    </>
  );
};
