import React from 'react';
import { render } from '@testing-library/react';
import { LineStatusListItem, LineStatusListItemProps } from './index';

const mockProps: LineStatusListItemProps = {
  lineId: '123',
  name: 'Line Name',
  status: 'Active',
};

describe('LineStatusListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LineStatusListItem {...mockProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('renders LineStatusListItem component with correct props', () => {
    const { getByText } = render(<LineStatusListItem {...mockProps} />);

    expect(getByText('Line Name')).toBeInTheDocument();
    expect(getByText('Active')).toBeInTheDocument();
  });
});
