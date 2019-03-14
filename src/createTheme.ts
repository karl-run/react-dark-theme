import { Theme } from './index'

export const verifyTheme = (dark: Theme, light: Theme) => {
  const darkKeys: string[] = Object.keys(dark)
  const lightKeys: string[] = Object.keys(light)

  const darkSaturated = Object.keys(dark).every(value => {
    const index = lightKeys.indexOf(value)
    if (index >= 0) {
      lightKeys.splice(index, 1)
      return true
    }
    return false
  })

  const lightSaturated = Object.keys(light).every(value => {
    const index = darkKeys.indexOf(value)
    if (index >= 0) {
      darkKeys.splice(index, 1)
      return true
    }
    return false
  })

  if (!darkSaturated || !lightSaturated) {
    const lightError = lightKeys.length ? lightKeys.join(' \n') : 'None'
    const darkError = darkKeys.length ? darkKeys.join(' \n') : 'None'
    throw new Error(
      `Theme not saturated. Variables missing in light theme: ${lightError}. Variables missing in dark theme: ${darkError}`,
    )
  }
}

/**
 * Used to create a map CSS variables in your CSS-in-JS solution. Use these properties as values in your CSS.
 *
 * @param dark
 * @param light
 */
function createTheme<T extends Theme>(dark: T, light: T): T {
  verifyTheme(dark, light)

  const cssInJs = {}

  Object.keys(dark).forEach(key => {
    cssInJs[key] = `var(--${key})`
  })

  return cssInJs as T
}

export default createTheme
