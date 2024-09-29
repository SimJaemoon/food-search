import type { Meta, StoryObj } from '@storybook/react';

import SpeechBubble from '.';

const meta: Meta<typeof SpeechBubble> = {
  component: SpeechBubble,
  tags: ['autodocs'],
  args: {
    content: 'test message',
  },
};

export default meta;
type Story = StoryObj<typeof SpeechBubble>;

export const Question: Story = {
  args: {
    type: 'question',
  },
};

export const Answer: Story = {
  args: {
    type: 'answer',
  },
};

export const AnswerSelected: Story = {
  args: {
    type: 'answer',
    state: 'selected',
  },
};

export const AnswerDisabled: Story = {
  args: {
    type: 'answer',
    state: 'disabled',
  },
};
