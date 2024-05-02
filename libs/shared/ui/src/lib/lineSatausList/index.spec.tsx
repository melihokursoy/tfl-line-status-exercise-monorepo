import React from 'react';
import { render } from '@testing-library/react';
import { LineStatusList, LineStatusListProps } from './index';

const mockProps: LineStatusListProps = {
  title:"Status Updates",
  items:[{
  lineId: '123',
  name: 'Line Name',
  status: 'Active',
}]};

describe('LineStatusListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LineStatusList {...mockProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('renders LineStatusListItem component with correct props', () => {
    const { getByText } = render(<LineStatusList {...mockProps} />);
    expect(getByText('Status Updates')).toBeInTheDocument();
    expect(getByText('Line Name')).toBeInTheDocument();
    expect(getByText('Active')).toBeInTheDocument();
  });
});
