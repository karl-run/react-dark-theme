import { Theme } from './index'
import createTheme from './createTheme'

describe('createTheme', () => {
  it('shall throw error when lightTheme has value that darkTheme does not have', () => {
    const darkTheme: Theme = {
      a: 'yes',
      b: 'yes',
    }
    const lightTheme: Theme = {
      a: 'yes',
      b: 'yes',
      c: 'uh-oh',
    }

    const execute = () => createTheme(darkTheme, lightTheme)

    expect(execute).toThrowError(
      'Theme not saturated. Variables missing in light theme: c. Variables missing in dark theme: None',
    )
  })

  it('shall throw error when darkTheme has value that lightTheme does not have', () => {
    const darkTheme: Theme = {
      a: 'yes',
      b: 'yes',
      c: 'not-good',
    }
    const lightTheme: Theme = {
      a: 'yes',
      b: 'yes',
    }

    const execute = () => createTheme(darkTheme, lightTheme)

    expect(execute).toThrowError(
      'Theme not saturated. Variables missing in light theme: None. Variables missing in dark theme: c',
    )
  })

  it('shall throw error whet both themes have property the other does not have', () => {
    const darkTheme: Theme = {
      a: 'yes',
      b: 'yes',
      c: 'not-good',
    }
    const lightTheme: Theme = {
      a: 'yes',
      b: 'yes',
      d: 'also-not-good',
    }

    const execute = () => createTheme(darkTheme, lightTheme)

    expect(execute).toThrowError(
      'Theme not saturated. Variables missing in light theme: d. Variables missing in dark theme: c',
    )
  })

  it('shall successfully create a theme when both themes are saturated', () => {
    const darkTheme: Theme = {
      a: 'dark-yes',
      b: 'dark-yes',
      c: 'dark-yes',
    }
    const lightTheme: Theme = {
      a: 'light-yes',
      b: 'light-yes',
      c: 'light-yes',
    }

    const theme = createTheme(darkTheme, lightTheme)

    expect(theme).toEqual({
      a: 'var(--a)',
      b: 'var(--b)',
      c: 'var(--c)',
    })
  })
})
