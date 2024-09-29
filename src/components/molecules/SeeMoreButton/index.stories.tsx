import type { Meta, StoryObj } from '@storybook/react';

import SeeMoreButton from '.';

const meta: Meta<typeof SeeMoreButton> = {
  component: SeeMoreButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SeeMoreButton>;

export const BarUp: Story = {
  args: {
    type: 'bar',
    direction: 'up',
    shapeColor: 'background',
    backgroundColor: 'onBackground',
    handleClick: () => {},
  },
};

export const BarDown: Story = {
  args: {
    type: 'bar',
    direction: 'down',
    shapeColor: 'background',
    backgroundColor: 'onBackground',
    handleClick: () => {},
  },
};

export const SignLeft: Story = {
  args: {
    type: 'sign',
    direction: 'left',
    shapeColor: 'secondaryEmphasize',
    backgroundColor: 'background',
    handleClick: () => {},
  },
};

export const SignRight: Story = {
  args: {
    type: 'sign',
    direction: 'right',
    shapeColor: 'secondaryEmphasize',
    backgroundColor: 'background',
    handleClick: () => {},
  },
};
