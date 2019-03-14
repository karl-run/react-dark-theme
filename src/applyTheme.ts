import { Theme } from './index'

/**
 * Used only if you need to apply a theme because you are
 * unable to mount the `DarkTheme` component early in your life cycle.
 *
 * @param theme
 */
const applyTheme = (theme: Theme) => {
  const element = document.documentElement

  Object.keys(theme).forEach((key: string) => {
    if (element == null) return

    element.style.setProperty(`--${key}`, theme[key])
  })
}

export default applyTheme
