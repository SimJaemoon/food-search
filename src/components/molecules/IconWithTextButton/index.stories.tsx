import type { Meta, StoryObj } from '@storybook/react';

import IconWithTextButton from '.';

const meta: Meta<typeof IconWithTextButton> = {
  component: IconWithTextButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconWithTextButton>;

export const IconPositionRight: Story = {
  args: {
    iconName: 'delivery',
    iconPosition: 'right',
  },
};

export const IconPositionLeft: Story = {
  args: {
    iconName: 'cart',
    iconPosition: 'left',
  },
};

export const IconPositionCenter: Story = {
  args: {
    iconName: 'home',
    iconPosition: 'center',
  },
};
