import { render } from '@testing-library/react';

import App from './app';
import apiResponseMock from '../mocks/apiResponse.json';

// Mock the fetch API
global.fetch = jest.fn();

beforeEach(() => {
    global.fetch.mockResolvedValue({
        json: async () => apiResponseMock,
    });
});

afterEach(() => {
    jest.clearAllMocks(); 
});

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
