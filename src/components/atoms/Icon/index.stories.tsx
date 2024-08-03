import type { Meta, StoryObj } from '@storybook/react';

import Icon from '.';

const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Delivery: Story = {
  args: {
    iconName: 'delivery',
  },
};

export const Cart: Story = {
  args: {
    iconName: 'cart',
  },
};

export const Person: Story = {
  args: {
    iconName: 'person',
  },
};

export const NoticeBubble: Story = {
  args: {
    iconName: 'noticeBubble',
  },
};

export const Back: Story = {
  args: {
    iconName: 'back',
  },
};

export const Close: Story = {
  args: {
    iconName: 'close',
  },
};

export const CloseCircle: Story = {
  args: {
    iconName: 'closeCircle',
  },
};

export const Magnifier: Story = {
  args: {
    iconName: 'magnifier',
  },
};
