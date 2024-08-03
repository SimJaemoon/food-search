import type { Meta, StoryObj } from '@storybook/react';

import SearchBox from '.';

const meta: Meta<typeof SearchBox> = {
  component: SearchBox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-[calc(48px-3px)]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Landing: Story = {
  args: {
    pageName: 'Landing',
  },
};

export const Other: Story = {
  args: {
    pageName: 'other',
  },
  decorators: [
    (Story) => (
      <div className="w-full px-12">
        <Story />
      </div>
    ),
  ],
};
