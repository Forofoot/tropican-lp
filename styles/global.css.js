import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html{
    scroll-behavior: smooth;
    font-family: 'Inter', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    overflow-x: hidden;
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
  
  .form input, .btnDefault{
    margin-bottom:25px;
  }
`