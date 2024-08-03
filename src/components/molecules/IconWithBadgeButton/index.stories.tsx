import type { Meta, StoryObj } from '@storybook/react';

import IconWithBadgeButton from '.';

const meta: Meta<typeof IconWithBadgeButton> = {
  component: IconWithBadgeButton,
  tags: ['autodocs'],
  args: {
    badgeContent: 99,
  },
};

export default meta;
type Story = StoryObj<typeof IconWithBadgeButton>;

export const BadgePositionCenter: Story = {
  args: {
    iconName: 'noticeBubble',
    badgePosition: 'center',
  },
};

export const BadgePositionRight: Story = {
  args: {
    iconName: 'delivery',
    badgePosition: 'right',
  },
};
