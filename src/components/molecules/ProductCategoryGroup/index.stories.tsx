import type { Meta, StoryObj } from '@storybook/react';

import ProductCategoryGroup from '.';

const meta: Meta<typeof ProductCategoryGroup> = {
  component: ProductCategoryGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCategoryGroup>;

export const Default: Story = {
  args: {
    displayedProductCategories: Array.from({ length: 6 }, (_, i) => ({
      display_order: i,
      category_id: 'vegetable',
      category_name: 'vegetable',
    })),
    totalPageNumber: 1,
    pageNumber: 1,
    handleNextButtonClick: () => {},
    handleBackButtonClick: () => {},
  },
};
