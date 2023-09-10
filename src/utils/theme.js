import { extendTheme } from '@chakra-ui/react'

const colors = {
  primary: {
    base: '#00578A',
    default: '#3C4852',
    error: '#eb5757',
  },
  app: {
    background: '#eceff2',
    table: { 100: '#077ee866' },
  },
  font: {
    heading: '#485465',
  },
}

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Poppins', sans-serif`,
}
const customTheme = extendTheme({ colors, fonts, breakpoints })

export default customTheme
