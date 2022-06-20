import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  html, body {
    height: 100%;
  }
  html{
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    min-height:100vh;
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-display: optional;
  }
  img{
    border:0;
    display:inline-block;
    vertical-align:middle;
    max-width:100%;
    height:auto;
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
  h1,h2,h3{
    margin: 0;
  } 
  h1{
    font-size:1.875em;
  }
  h2{
    font-size:1.5em;
  }
  .btnDefault{
    all: unset;
    background-color: #F0E5C3;
    color: #42A0B6;
    padding: 10px 0;
    text-align: center;
    text-transform:uppercase;
    width: 100%;
    border-radius: 50px;
    margin-top: 15px;
    &:hover{
      cursor: pointer;
    }
  }
  figure{
    margin: 0;
  }

  .form{
    input{
      all: unset;
      width:100%;
      position: relative;
      padding-bottom: 10px;
      border-bottom: 1px solid #fff;
      &:focus{
        color:#fff;
        & +.separator{
          transform: scaleX(1) translateY(-2px);   
          opacity: 1;
        }
      }
      &::placeholder{
        color:#fff;
      }
    }
  }
  
  .form input,.form label, .btnDefault{
    margin-bottom:25px;
  }
`