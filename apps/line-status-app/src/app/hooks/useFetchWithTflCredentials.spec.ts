import fetchMock from 'jest-fetch-mock';
import { waitFor } from '@testing-library/react';
import apiResponseMock from '../../mocks/apiResponse.json';

// Mocking environment variables
const originalEnv = process.env;

describe('useFetchWithTflCredentials', () => {
    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
        fetchMock.enableMocks();
        fetchMock.resetMocks();
        // Mock environment variables
        process.env.NX_TFL_APP_ID = 'mock_app_id';
        process.env.NX_TFL_APP_KEY = 'mock_app_key';
    });

    afterEach(() => {
        process.env = originalEnv
    });

    it('should make a fetch request with default fetch options and credentials', async () => {
        expect(process.env.NX_TFL_APP_ID).toBe('mock_app_id');
        expect(process.env.NX_TFL_APP_KEY).toBe('mock_app_key');

        const { useFetchWithTflCredentials, DEFAULT_FETCH_OPTIONS, UseFetchProps } = require('./useFetchWithTflCredentials');

        const url = 'https://api.example.com/data';
        const input = { foo: 'bar' };
        const fetchOptions = { method: 'POST' };

        // Mocking fetch response
        fetchMock.mockResponse(JSON.stringify(apiResponseMock));


        const response = await (await useFetchWithTflCredentials({ url, fetchOptions, input })).json()

        // Verify that fetch was called with the correct URL and options
        await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
            `https://api.example.com/data?app_id=mock_app_id&app_key=mock_app_key`,
            expect.objectContaining({
                ...DEFAULT_FETCH_OPTIONS.options,
                ...fetchOptions,
                body: JSON.stringify(input),
            })
        ))

        // Verify response
        expect(response).toEqual(apiResponseMock);
    });
});
