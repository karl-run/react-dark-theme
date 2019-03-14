/**
 * Example page of using react-dark-theme with CSS in JS
 */

import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import faker from 'faker'

import DarkTheme, { createTheme, applyTheme } from 'react-dark-theme'

import { ReactComponent as GithubLogo } from './github.svg'

const normalTheme = {
  background: '#F2FCFF',
  headerColor: '#98ACB2',
  cardColor: '#FFF9F2',
  text: '#333',
  secondaryText: '#666',
  shadow:
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),\n    0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
}

const darkTheme = {
  background: '#0D0609',
  headerColor: '#261119',
  cardColor: '#383700',
  text: '#EEE',
  secondaryText: 'lightgray',
  shadow:
    '0px 2px 4px -1px rgba(55, 55, 55, 0.2), 0px 4px 5px 0px rgba(55, 55, 55, 0.14),\n    0px 1px 10px 0px rgba(55, 55, 55, 0.12)',
}

const cssInJsTheme = createTheme(darkTheme, normalTheme)

/* Apply theme at module load time instead of at initial render so that the style is visible much earlier.
 * Not necessary if you mount your switch early in the life cycle. */
applyTheme(normalTheme)

console.log(cssInJsTheme)

const GlobalStyle = createGlobalStyle`
  body{
    transition: all 100ms ease-out;
    background-color: ${cssInJsTheme.background};
  }
`

const Header = styled.header`
  transition: all 100ms ease-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  color: ${cssInJsTheme.text};
  background-color: ${cssInJsTheme.headerColor};
  margin: 0;
  padding: 0;
  z-index: 2;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: ${cssInJsTheme.shadow};
`

const Title = styled.h1`
  transition: all 100ms ease-out;
  color: ${cssInJsTheme.text};
  margin-left: 16px;
  font-size: 22px;
`

const Text = styled.div`
  transition: all 100ms ease-out;
  color: ${cssInJsTheme.secondaryText};
  font-size: 12px;
  margin: 8px;
`

const Content = styled.section`
  transition: all 100ms ease-out;
  padding-top: 1px;
  border-radius: 3px;
  margin: 74px auto 0;
  min-height: 700px;
  width: 80%;
  max-width: 1100px;
  background-color: ${cssInJsTheme.cardColor};
  box-shadow: ${cssInJsTheme.shadow};

  @media screen and (max-width: 460px) {
    width: 92%;
  }
`

const Boxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
`

const Box = styled.div`
  transition: all 100ms ease-out;
  background-color: ${cssInJsTheme.background};
  flex: 0 1 20%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 3px;
  box-shadow: ${cssInJsTheme.shadow};

  > h1 {
    padding: 0;
    margin: 4px 4px 0;
  }

  @media screen and (max-width: 460px) {
    flex: 0 0 80%;
  }
`

const ThemeWrapper = styled.div`
  margin-top: 4px;
  margin-right: 18px;
`

const GithubLink = styled.div`
  position: fixed;
  background-color: ${cssInJsTheme.headerColor};
  border-radius: 50%;
  height: 48px;
  width: 48px;
  bottom: 16px;
  right: 16px;
  box-shadow: ${cssInJsTheme.shadow};

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    &:hover {
      > svg {
        transform: rotate(720deg);
      }
    }

    > svg {
      color: ${cssInJsTheme.text};
      width: 32px;
      height: 32px;
      transition: transform 360ms ease-in-out;
    }
  }
`

const fakeContent = Array(100)
  .fill({})
  .map(() => ({
    title: faker.hacker.noun(),
    text: faker.hacker.phrase(),
  }))

const App = () => (
  <div>
    <GlobalStyle />
    <Header>
      <Title>react-dark-theme</Title>
      <ThemeWrapper>
        <DarkTheme light={normalTheme} dark={darkTheme} />
      </ThemeWrapper>
    </Header>
    <Content>
      <Title>Change the theme in the upper right corner</Title>
      <Text>
        It uses CSS-variables, so it's as fast as it can be. No need to forcefully re-render your entire
        React-application when your theme changes.
      </Text>
      <Boxes>
        {fakeContent.map(value => (
          <Box key={`${value.text}-${value.title}`}>
            <Title>{value.title}</Title>
            <Text>{value.text}</Text>
          </Box>
        ))}
      </Boxes>
      <GithubLink>
        <a
          title="github source"
          href="https://github.com/karl-run/react-dark-theme"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo />
        </a>
      </GithubLink>
    </Content>
  </div>
)

export default App
