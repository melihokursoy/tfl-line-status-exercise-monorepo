import type { Meta, StoryObj } from '@storybook/react';
import { LineStatusList } from './index';
import { Layout } from '../layout';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LineStatusList> = {
  title: "Line Status List",
  component: LineStatusList,
  decorators: [
    (Story) => (
      <Layout>
        <Story />
      </Layout>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof LineStatusList>;

export const Default = {
  args: {
    title: 'Status Updates',
    items: [
      { lineId: 'bakerloo', name: 'Bakerloo', status: 'Good Service' },
      { lineId: 'central', name: 'Central', status: 'Good Service' },
      { lineId: 'circle', name: 'Circle', status: 'Good Service' },
      { lineId: 'district', name: 'District', status: 'Minor Delays' },
      {
        lineId: 'hammersmith-city',
        name: 'Hammersmith & City',
        status: 'Good Service',
      },
      { lineId: 'jubilee', name: 'Jubilee', status: 'Good Service' },
      { lineId: 'metropolitan', name: 'Metropolitan', status: 'Good Service' },
      { lineId: 'northern', name: 'Northern', status: 'Minor Delays' },
      { lineId: 'piccadilly', name: 'Piccadilly', status: 'Good Service' },
      { lineId: 'victoria', name: 'Victoria', status: 'Good Service' },
      {
        lineId: 'waterloo-city',
        name: 'Waterloo & City',
        status: 'Good Service',
      },
      {
        lineId: 'default',
        name: 'Default',
        status: 'Good Service',
      },
      {
        lineId: 'default',
        name: 'An Extra Long Name Goes Here ',
        status: 'Good Service, Minor Delays, Another Status',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Status Updates/gi)).toBeTruthy();
    expect(canvas.getByText(/Bakerloo/gi)).toBeTruthy();
  },
};
