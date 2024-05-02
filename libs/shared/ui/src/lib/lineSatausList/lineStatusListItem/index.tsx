import React, { ReactNode } from 'react';
import { StyledLi } from './styles'

export interface LineStatusListItemProps {
    lineId: string;
    name: string;
    status: string;
  }

export const LineStatusListItem: React.FC<LineStatusListItemProps> = ({name,status, ...rest})=>{
    return <StyledLi {...rest}><span>{name}</span>
    <span>{status}</span>
    </StyledLi>
} 

