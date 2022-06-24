import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  @font-face {
    font-family: "SofiaPRO";
    src: url('./fonts/sofiapro-light-webfont.woff') format('woff'); 
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "MarkPRO";
    src: url('./fonts/Mark-Pro-Bold.woff') format('woff'); 
    font-weight: bold;
    font-style: normal;
  }

  html, body {
    height: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    min-height:100vh;
    width: 100%;
    font-family: 'SofiaPRO', sans-serif;
    font-size: 16px;
    background-color: #F4F4F4;
    color: #313131;
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
    color:#F4F4F4;
  }
  h1,h2,h3{
    margin: 0;
    line-height: 37px;
    font-weight: 400;
    color:#147543;
  } 
  h1,h2,h3, label{
    font-family: 'MarkPRO', sans-serif;
  }
  h1{
    font-size:1.875em;
  }
  h2{
    font-size:1.5em;
  }
  section{
    margin-bottom: 80px;
  }
  
  .container{
    padding: 0 25px;
  }
  .btnDefault,
  .btnPrimary{
    all: unset;
    padding: 15px 0;
    text-align: center;
    width: 180px;
    border-radius: 50px;
  }

  .btnDefault{
    border: 1px solid #F4F4F4;
    background-color: transparent;
    transition: all .3s ease-in-out;
    will-change: background-color, color;
    &:hover{
      cursor: pointer;
      background-color: #F4F4F4;
      color: #7159AD;
    }
  }

  .btnPrimary{
    text-transform: none;
    background-color: #7159AD;
    color: #F4F4F4;
    border: none;
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
      border-bottom: 1px solid #F4F4F4;
      &:focus{
        color:#F4F4F4;
        & +.separator{
          transform: scaleX(1) translateY(-2px);   
          opacity: 1;
        }
      }
      &::placeholder{
        color:#F4F4F4;
      }
    }
  }
  
  .form input,.form label, .btnDefault{
    margin-bottom:25px;
  }

  .card{
    padding: 20px 30px;
    border-radius: 20px;
    text-align: left;
    line-height: 20px;
    box-shadow: 0px 0px 10px rgba(113, 89, 173, 0.5);
    max-width: 500px;
    h2{
      color: #7159AD;
    }
  }
`