export interface Theme {
  colors: {
    primary: string
    secondary: string
    white: string
    black: string
    background: string
    error: string
    success: string
  }
  fontFamily: {
    primary: string
  }
  fontSizes: {
    h1: string
    h2: string
    h3: string
    h4: string
    h5: string
    h6: string
    b1: string
    b2: string
    b3: string
    b4: string
    b5: string
  }
  fontWeights: {
    light: string
    regular: string
    bold: string
  }
  media: {
    sm: Interpolation<
      ThemedStyledProps<
        Omit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          'ref'
        > & {
          ref?:
            | ((instance: HTMLDivElement | null) => void)
            | RefObject<HTMLDivElement>
            | null
            | undefined
        },
        DefaultTheme
      >
    >
    lessThan: (breakpoint: number) => string
    between: (first: number, second: number) => string
    greaterThan: (breakpoint: number) => string
    forPhoneOnly: () => string
    forTablePortraitUp: () => string
    forTablePortraitOnly: () => string
    forTableLandscapeUp: () => string
    forTableLandscapeOnly: () => string
    forDesktopUp: () => string
    forDesktopOnly: () => string
    forBigDesktopUp: () => string
  }
}
