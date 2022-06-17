import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html{
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  ul{
    list-style: none;
    margin: 0;
    padding-left: 0;
  }
  a{
    cursor: pointer;
    text-decoration: none;
    color: #000;
  }
`