import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from './theme';
import { Wrapper } from './styles';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};
