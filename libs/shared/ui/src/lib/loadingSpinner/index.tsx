import React from 'react';
import { createPortal } from 'react-dom';

import { StyledOverlay, StyledSpinner } from './styles';

export interface LoadingSpinnerProps {
  loading: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading = false,
}) => {
  return  createPortal(
    loading ? <StyledOverlay>
      <StyledSpinner data-testid="loading-spinner"/>
    </StyledOverlay>: null,
    document.body
  ) 
};
