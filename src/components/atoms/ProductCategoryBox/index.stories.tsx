import type { Meta, StoryObj } from '@storybook/react';

import ProductCategoryBox from '.';

const meta: Meta<typeof ProductCategoryBox> = {
  component: ProductCategoryBox,
  tags: ['autodocs'],
  args: {
    displayedProductCategory: {
      display_order: 1,
      category_id: 'vegetable',
      category_name: '채소',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCategoryBox>;

export const Row1LeftBox: Story = {
  args: {
    rowOrder: 'firstRow',
    direction: 'left',
    pageNumber: 1,
  },
  decorators: [
    (Story) => (
      <div className="relative left-[0] top-[0] h-[calc((640px-128px)*435/1000)] w-full">
        <Story />
      </div>
    ),
  ],
};

export const Row1RightBox: Story = {
  args: {
    rowOrder: 'firstRow',
    direction: 'right',
  },
  decorators: [
    (Story) => (
      <div className="relative left-[0] top-[0] h-[calc((640px-128px)*435/1000)] w-full">
        <Story />
      </div>
    ),
  ],
};

export const Row2LeftBox: Story = {
  args: {
    rowOrder: 'secondRow',
    direction: 'left',
  },
  decorators: [
    (Story) => (
      <div className="relative left-[0] top-[30%] h-[calc((640px-128px)*280/1000)] w-full">
        <Story />
      </div>
    ),
  ],
};

export const Row2RightBox: Story = {
  args: {
    rowOrder: 'secondRow',
    direction: 'right',
  },
  decorators: [
    (Story) => (
      <div className="relative left-[0] top-[30%] h-[calc((640px-128px)*280/1000)] w-full">
        <Story />
      </div>
    ),
  ],
};

export const Row3LeftBox: Story = {
  args: {
    rowOrder: 'thirdRow',
    direction: 'left',
  },
  decorators: [
    (Story) => (
      <div className="relative left-[0] top-[66.5%] h-[calc((640px-128px)*335/1000)] w-full">
        <Story />
      </div>
    ),
  ],
};

export const Row3RightBox: Story = {
  args: {
    rowOrder: 'thirdRow',
    direction: 'right',
  },
  decorators: [
    (Story) => (
      <div className="relative left-[0] top-[66.5%] h-[calc((640px-128px)*335/1000)] w-full">
        <Story />
      </div>
    ),
  ],
};
