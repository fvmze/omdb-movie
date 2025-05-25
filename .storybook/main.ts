import type { StorybookConfig } from '@storybook/experimental-nextjs-vite'

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  typescript: {
    reactDocgen: 'react-docgen',
  },
}

export default config
