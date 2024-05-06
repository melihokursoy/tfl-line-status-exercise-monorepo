// LineStatus.test.js

import React, { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { LineStatus } from '.';
import { Layout } from '@tfl-line-status-excersise-monorepo/ui';
import apiResponseMock from '../../../mocks/apiResponse.json';
import { QueryClientWrapper } from '../queryClientWrapper';

const customWrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientWrapper>
    <Layout>{children}</Layout>
  </QueryClientWrapper>
);

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(apiResponseMock),
  }),
) as jest.Mock;

afterEach(() => {
  jest.clearAllMocks();
});

describe('LineStatus Component', () => {
  it('renders LoadingSpinner when isLoading is true', async () => {
    const { queryByTestId } = render(<LineStatus />, {
      wrapper: customWrapper,
    });

    await waitFor(
      () => expect(queryByTestId('loading-spinner')).toBeInTheDocument(),
      { timeout: 2000 }
    );

    await waitFor(
      () => expect(queryByTestId('loading-spinner')).not.toBeInTheDocument(),
      { timeout: 2000 }
    );
  });

  it('renders LineStatusList items', async () => {
    const { queryByTestId, queryAllByTestId } = render(<LineStatus />, {
      wrapper: customWrapper,
    });

    await waitFor(
      () =>
        expect(queryAllByTestId('line-status-list-item')).toHaveLength(
          apiResponseMock.length
        ),
      { timeout: 2000 }
    );
  });
});
