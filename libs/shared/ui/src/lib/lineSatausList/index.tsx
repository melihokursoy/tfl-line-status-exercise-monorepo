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
      <StyledH1 role="heading">{title}</StyledH1>
      <StyledUl role="list" data-testid="line-status-list">
        {items?.map((line,i) => (
          <LineStatusListItem key={`list-item-for-${line.lineId}`}  tabindex={`${i}`} {...line} />
        ))}
      </StyledUl>
    </>
  );
};
