import type { Meta, StoryObj } from '@storybook/react';

import TextWithBorderButton from '.';

const meta: Meta<typeof TextWithBorderButton> = {
  component: TextWithBorderButton,
  tags: ['autodocs'],
  args: {
    textContent: 'test button',
  },
};

export default meta;
type Story = StoryObj<typeof TextWithBorderButton>;

export const CategoryDetailGroup: Story = {
  args: {
    url: '/',
    type: 'categoryDetailGroup',
    status: 'normal',
  },
};

export const CategoryDetailGroupSelected: Story = {
  args: {
    url: '/',
    type: 'categoryDetailGroup',
    status: 'selected',
  },
};

export const CategoryDetailSingle: Story = {
  args: {
    url: '/',
    type: 'categoryDetailSingle',
    status: 'normal',
  },
};

export const CategoryDetailSingleSelected: Story = {
  args: {
    url: '/',
    type: 'categoryDetailSingle',
    status: 'selected',
  },
};
