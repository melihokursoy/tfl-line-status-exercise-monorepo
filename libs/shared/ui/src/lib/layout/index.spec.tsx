import React from 'react';
import { render } from '@testing-library/react';
import Layout from './index';

describe('Layout component', () => {
  it('renders children correctly', () => {
    const { getByTestId } = render(
      <Layout>
        <div data-testid="test-child">Test Child</div>
      </Layout>
    );

    const childElement = getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement.textContent).toBe('Test Child');
  });
});