import { colors } from '@material-ui/core'

import { Theme } from '@/styles'

const breakpoints = Object.freeze({
  xsmall: 600,
  small: 960,
  medium: 1280,
  large: 1920
})

const extractBreakpointValue = (breakpoint: number) => `${breakpoint}px`

export const theme = Object.freeze<Theme>({
  colors: {
    primary: '#0D2C54',
    secondary: '#7FB800',
    white: '#FFFFFF',
    black: '#000000',
    background: '#F7F7F7',
    error: colors.red[400],
    success: colors.green[400]
  },
  fontFamily: {
    primary:
      "'Work Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  },
  fontSizes: {
    h1: '84px',
    h2: '72px',
    h3: '60px',
    h4: '48px',
    h5: '36px',
    h6: '30px',
    b1: '24px',
    b2: '20px',
    b3: '16px',
    b4: '14px',
    b5: '10px'
  },
  fontWeights: {
    light: '400',
    regular: '500',
    bold: '700'
  },
  media: {
    lessThan: (breakpoint: number): string =>
      `@media(max-width: ${extractBreakpointValue(breakpoint)})`,

    between: (first: number, second: number): string => {
      const parsedFirst = extractBreakpointValue(first)
      const parsedSecond = extractBreakpointValue(second)

      return `@media (min-width: ${parsedFirst}) and (max-width: ${parsedSecond})`
    },

    greaterThan: (breakpoint: number): string =>
      `@media(min-width: ${extractBreakpointValue(breakpoint)})`,

    forPhoneOnly: (): string =>
      `@media(max-width: ${extractBreakpointValue(breakpoints.xsmall)})`,

    forTablePortraitUp: (): string =>
      `@media(min-width: ${extractBreakpointValue(breakpoints.xsmall)})`,

    forTablePortraitOnly: (): string =>
      `@media(min-width: ${extractBreakpointValue(
        breakpoints.xsmall
      )}) and (max-width: ${extractBreakpointValue(breakpoints.small)})`,

    forTableLandscapeUp: (): string =>
      `@media(min-width: ${extractBreakpointValue(breakpoints.small)})`,

    forTableLandscapeOnly: (): string =>
      `@media(min-width: ${extractBreakpointValue(
        breakpoints.small
      )}) and (max-width: ${extractBreakpointValue(breakpoints.medium)})`,

    forDesktopUp: (): string =>
      `@media(min-width: ${extractBreakpointValue(breakpoints.medium)})`,

    forDesktopOnly: (): string =>
      `@media(min-width: ${extractBreakpointValue(
        breakpoints.medium
      )}) and (max-width: ${extractBreakpointValue(breakpoints.large)})`,

    forBigDesktopUp: (): string =>
      `@media(min-width: ${extractBreakpointValue(breakpoints.large)})`
  }
})
