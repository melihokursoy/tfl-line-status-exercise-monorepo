import type { Meta, StoryObj } from '@storybook/react';
import  { Layout } from './index';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Layout> = {
  title: "Layout",
  component: Layout
};
export default meta;
type Story = StoryObj<typeof Layout>;

export const Default = {
  args: {
    children: <span>Content</span>
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Content/gi)).toBeTruthy();
  },
};

