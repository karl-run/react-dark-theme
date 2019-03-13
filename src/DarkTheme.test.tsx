import React from 'react'
import { render } from 'react-testing-library'

import DarkTheme from './'

describe('DarkTheme', () => {
  it('should throw error when themes are not equal', () => {
    const renderer = () => render(<DarkTheme dark={{ a: 'dark-a' }} light={{ b: 'light-b' }} />)

    expect(renderer).toThrowError(
      'Theme not saturated. Variables missing in light theme: b. Variables missing in dark theme: a',
    )
  })

  it('should not throw error when themes are saturated', () => {
    const wrapper = render(<DarkTheme dark={{ a: 'dark-a' }} light={{ a: 'light-a' }} />)

    expect(wrapper).toBeTruthy()
  })
})
