import type { Meta, StoryObj } from '@storybook/react';

import Splash from '.';

const meta: Meta<typeof Splash> = {
  component: Splash,
};

export default meta;
type Story = StoryObj<typeof Splash>;

export const Default: Story = {
  args: {},
};
