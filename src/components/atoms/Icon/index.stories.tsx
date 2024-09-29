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

export const Home: Story = {
  args: {
    iconName: 'home',
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

export const Walker: Story = {
  args: {
    iconName: 'walker',
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

export const Next: Story = {
  args: {
    iconName: 'next',
  },
};

export const KeyboardArrowLeft: Story = {
  args: {
    iconName: 'keyboardArrowLeft',
  },
};

export const KeyboardArrowRight: Story = {
  args: {
    iconName: 'keyboardArrowRight',
  },
};

export const SwitchLeft: Story = {
  args: {
    iconName: 'switchLeft',
  },
};

export const SwitchRight: Story = {
  args: {
    iconName: 'switchRight',
  },
};

export const TrashCan: Story = {
  args: {
    iconName: 'trashCan',
  },
};
