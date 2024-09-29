import type { Meta, StoryObj } from '@storybook/react';

import ProductCardGorup from '.';

const meta: Meta<typeof ProductCardGorup> = {
  component: ProductCardGorup,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-full items-center justify-center">
        <div className="relative h-[360px] w-full">
          <Story />
        </div>
        <div className="h-[100px]"></div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCardGorup>;

const testDescription = 'Lorem Ipsum'.repeat(5);

export const Default: Story = {
  args: {
    sortedProducts: Array.from({ length: 10 }, (_, i) => ({
      single_id: 'test' + i,
      product_id: 'test' + i,
      brand_id: 'test' + i,
      brand_name: 'test' + i,
      image_url: 'mockProductImage',
      product_name: 'test' + i,
      product_price: 123456789,
      quantity_unit: 'g',
      quantity_value: 123456879,
      review_average_score: 123465789,
      review_number: 123456789,
      product_origin: 'test' + i,
      product_description: testDescription,
      seller_id: 'test' + i,
      seller_name: 'test' + i,
    })),
    displayedProductCardStartIndex: 0,
    handleCardClickWithParameter: () => () => {},
  },
};
