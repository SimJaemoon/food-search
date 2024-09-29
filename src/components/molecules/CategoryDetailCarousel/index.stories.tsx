import type { Meta, StoryObj } from '@storybook/react';

import CategoryDetailCarousel from '.';

const meta: Meta<typeof CategoryDetailCarousel> = {
  component: CategoryDetailCarousel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-12">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CategoryDetailCarousel>;

export const ProductCategoryGroup: Story = {
  args: {
    groupId: '1',
    type: 'categoryDetailGroup',
    groupData: Array.from({ length: 10 }, (_, i) => ({
      group_id: `${i}`,
      group_name: 'group' + i,
    })),
  },
};

export const ProductCategorySingle: Story = {
  args: {
    groupId: '2',
    type: 'categoryDetailSingle',
    singleData: Array.from({ length: 10 }, (_, i) => ({
      single_id: `${i}`,
      single_name: 'single' + i,
    })),
  },
};
