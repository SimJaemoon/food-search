import type { Meta, StoryObj } from '@storybook/react';

import ProductListStand from '.';

const meta: Meta<typeof ProductListStand> = {
  component: ProductListStand,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="relative w-[328px] py-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductListStand>;

export const Default: Story = {
  args: {
    totalItemNumber: 15,
    displayedProductCardStartIndex: 3,
    handleLeftSeeMoreButtonClick: () => {},
    handleRightSeeMoreButtonClick: () => {},
  },
};
