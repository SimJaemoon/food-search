import type { Meta, StoryObj } from '@storybook/react';

import TextButton from '.';

const meta: Meta<typeof TextButton> = {
  component: TextButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  args: {
    textContent: '수요일 00시 ~ 00시 사이',
    url: '/',
  },
};
