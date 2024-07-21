import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Environment
    screens: {
      tablet: '640px',
      desktop: '1280px',
    },
    spacing: {
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '20px',
      '6': '24px',
      '7': '28px',
      '8': '32px',
      '9': '36px',
      '10': '40px',
      '11': '44px',
      '12': '48px',
    },
    boxShadow: {
      '1': '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
      '2': '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
      '3': '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
      '4': '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
      '5': '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
      figma: '0px 4px 4px rgba(0, 0, 0, 0.25)', // Figma default effect
    },

    // Base
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#AE6424',
      primaryEmphasize: '#7E3E22',
      secondary: '#C4905B',
      secondaryEmphasize: '#975638',
      background: '#FFFFFF',
      highlight: '#FF0000',
      disabled: '#B0B0B0',
      onPrimary: '#FFFFFF',
      onPrimaryEmphasize: '#FFFFFF',
      onSecondary: '#FFFFFF',
      onSecondaryEmphasize: '#FFFFFF',
      onBackground: '#000000',
      onHighlight: '#FFFFFF',
      onDisabled: '#FFFFFF',
    },
    fontSize: {
      '16px': '16px',
      '20px': '20px',
      '24px': '24px',
      '28px': '28px',
      '32px': '32px',
      '40px': '40px',
      '48px': '48px',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '16px',
    },

    extend: {
      blur: {
        figma: '2px',
      },
      lineHeight: {
        '125p': '125%',
      },
    },
  },
  plugins: [],
};

export default config;
