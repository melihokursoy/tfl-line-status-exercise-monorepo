import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from './index';
import { Layout } from '../layout';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LoadingSpinner> = {
  title: "Loading Spinner",
  component: LoadingSpinner,
  decorators: [
    (Story) => (
      <Layout>
        <Story />
      </Layout>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default = {
  args: {
  loading:true
  },
};
