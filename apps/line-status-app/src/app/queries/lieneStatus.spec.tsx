import { renderHook } from '@testing-library/react-hooks';
import { useLineStatusQuery } from './lineStatus';
import { useFetchWithTflCredentials } from '../hooks/useFetchWithTflCredentials';
import { QueryClientWrapper } from '../components/queryClientWrapper';
import mockApiResponse from '../../mocks/apiResponse.json'

const customWrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

jest.mock('../hooks/useFetchWithTflCredentials', () => ({
  useFetchWithTflCredentials: jest.fn(),
}));

describe('useLineStatusQuery', () => {
  it('fetches line status data', async () => {

    const mockUseFetchWithTflCredentials =
      useFetchWithTflCredentials as jest.MockedFunction<
        typeof useFetchWithTflCredentials
      >;
    mockUseFetchWithTflCredentials.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    const { result, waitForNextUpdate } = renderHook(
      () => useLineStatusQuery(),
      { wrapper: customWrapper }
    );

    expect(result.current.isLoading).toBe(true); // Initial loading state

    await waitForNextUpdate(); // Wait for hook to fetch data

    expect(mockUseFetchWithTflCredentials).toHaveBeenCalledWith({
      url: 'http://api.tfl.gov.uk/Line/Mode/Tube/Status',
      fetchOptions: { method: 'GET' },
    });

    expect(result.current.data).toEqual(mockApiResponse); // Check if data is fetched and set

    expect(result.current.isLoading).toBe(false); // Loading state after data fetch
    expect(result.current.error).toBeNull(); // No error occurred
  });

});
