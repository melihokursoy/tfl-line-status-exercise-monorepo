import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LineStatusListItem, LineStatusListItemProps } from './index';

// Mock StyledLi component
jest.mock('./styles', () => ({
  StyledLi: ({ children, ...rest }) => <li {...rest}>{children}</li>,
}));

// Define mock props for testing
const mockProps: LineStatusListItemProps = {
  lineId: '123',
  name: 'Line Name',
  status: 'Active',
};

describe('LineStatusListItem Component', () => {
  it('renders LineStatusListItem component with correct props', () => {
    const { getByText } = render(<LineStatusListItem {...mockProps} />);

    expect(getByText('Line Name')).toBeInTheDocument();
    expect(getByText('Active')).toBeInTheDocument();
  });

  it('renders LineStatusListItem component without crashing', () => {
    render(<LineStatusListItem {...mockProps} />);
    // If the component renders without crashing, the test passes
  });
});