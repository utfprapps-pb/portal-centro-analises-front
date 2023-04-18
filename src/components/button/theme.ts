import { theme } from '@/styles'
import { darken } from '@/utils'

export type Themes = 'primary' | 'error' | 'success' | 'white'

export type ButtonTheme = {
  materialUiColor: 'primary' | 'secondary' | 'inherit'
  color?: string
  background?: string
  backgroundHover?: string
}

type ButtonThemes = {
  [key in Themes]: ButtonTheme
}

export const buttonThemes: ButtonThemes = {
  primary: {
    materialUiColor: 'primary'
  },
  error: {
    materialUiColor: 'inherit',
    background: theme.colors.error,
    backgroundHover: darken({ color: theme.colors.error }),
    color: theme.colors.white
  },
  success: {
    materialUiColor: 'inherit',
    background: theme.colors.success,
    backgroundHover: darken({ color: theme.colors.success }),
    color: theme.colors.white
  },
  white: {
    materialUiColor: 'inherit',
    background: theme.colors.white,
    backgroundHover: darken({ color: theme.colors.white }),
    color: theme.colors.primary
  }
}
