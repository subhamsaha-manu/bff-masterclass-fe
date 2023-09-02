module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/components/elements/MonthPicker/MonthPicker.stories.tsx',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: { reactDocgen: false },
  framework: '@storybook/react',
}
