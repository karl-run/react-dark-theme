/**
 * @class DarkTheme
 */

import React from 'react'
import PropTypes from 'prop-types'
import ThemeSwitcher from 'react-css-vars'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'

import { Moon, Sun } from './Icons'
import { Theme } from './index'
import { verifyTheme } from './createTheme'

export type Props = {
  light: Theme
  dark: Theme
  defaultDark: boolean
  className?: string
}

type State = {
  dark: boolean
}

class DarkTheme extends React.Component<Props, State> {
  static propTypes = {
    light: PropTypes.object.isRequired,
    dark: PropTypes.object.isRequired,
    defaultDark: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    defaultDark: false,
    className: undefined,
  }

  constructor(props: Props) {
    super(props)

    verifyTheme(props.dark, props.light)

    this.state = {
      dark: props.defaultDark,
    }
  }

  handleToggleChange = () => {
    this.setState(prevState => ({ dark: !prevState.dark }))
  }

  render() {
    return (
      <>
        <ThemeSwitcher theme={this.state.dark ? this.props.dark : this.props.light} />
        <Toggle
          className={this.props.className}
          checked={this.state.dark}
          onChange={this.handleToggleChange}
          icons={{
            checked: <Moon />,
            unchecked: <Sun />,
          }}
        />
      </>
    )
  }
}

export default DarkTheme
