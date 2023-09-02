import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import MonthPicker from './MonthPicker'

export default {
  title: 'MonthPicker',
  component: MonthPicker,
} as ComponentMeta<typeof MonthPicker>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MonthPicker> = (args) => <MonthPicker {...args} />

export const MonthPickerStory = Template.bind({})

MonthPickerStory.args = {
  /*👇 The args you need here will depend on your component */
}
