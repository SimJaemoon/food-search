import type { Meta, StoryObj } from '@storybook/react';

import ProductCard from '.';

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  tags: ['autodocs'],
  args: {
    brand_name: 'brand name',
    image_url: 'mockProductImage',
    product_name: 'product name',
    product_price: 123456789,
    quantity_unit: 'g',
    review_average_score: 123456789,
    review_number: 123456789,
    handleCardClick: () => {},
  },
  decorators: [
    (Story) => (
      <div className="flex h-full items-center justify-center">
        <div className="relative h-[308px] w-[132px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    opaqueCardPosition: null,
  },
};

export const RightOpaqueCard: Story = {
  args: {
    opaqueCardPosition: 'right',
  },
};
export const LeftOpaqueCard: Story = {
  args: {
    opaqueCardPosition: 'left',
  },
};
