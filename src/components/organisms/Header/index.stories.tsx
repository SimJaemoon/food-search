import type { Meta, StoryObj } from '@storybook/react';

import Header from '.';

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Landing: Story = {
  args: {
    pageName: 'Landing',
  },
};
export const ProductList: Story = {
  args: {
    pageName: 'ProductList',
  },
};
export const Cart: Story = {
  args: {
    pageName: 'Cart',
  },
};
export const Order: Story = {
  args: {
    pageName: 'Order',
  },
};
