import type { Preview } from '@storybook/react';

import '../src/app/globals.css';

import React from 'react';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const customViewports = {
  minMobile: {
    name: 'min-Mobile',
    styles: {
      width: '360px',
      height: '672px',
    },
  },
  maxMobile: {
    name: 'max-Mobile',
    styles: {
      width: '639px',
      height: '672px',
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: { viewports: customViewports, defaultViewport: 'minMobile' },
  },
  decorators: [
    (Story) => (
      <div className={`${notoSansKR.className}`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
