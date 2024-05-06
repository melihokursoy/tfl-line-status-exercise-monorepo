import React, { ReactNode } from 'react';
import { StyledLi } from './styles';

export interface LineStatusListItemProps {
  lineId: string;
  name: string;
  status: string;
  tabindex?: string;
}

export const LineStatusListItem: React.FC<LineStatusListItemProps> = ({
  name,
  status,
  ...rest
}) => {
  return (
    <StyledLi role="listitem" {...rest} data-testid="line-status-list-item">
      <span>{name}</span>
      <span>{status}</span>
    </StyledLi>
  );
};
