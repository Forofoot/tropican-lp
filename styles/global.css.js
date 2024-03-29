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
    src: url('/fonts/Sofia-Pro-Regular.woff') format('woff'); 
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "MarkPRO";
    src: url('/fonts/Mark-Pro-Bold.woff') format('woff'); 
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
    position: relative;
    @media (min-width: 768px) {
      font-size: 20px;
    }
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
    color:#F20D97;
  } 
  h1,h2,h3, label{
    font-family: 'MarkPRO', sans-serif;
  }
  h1{
    font-size:1.875em;
  }
  h2{
    font-size:1.875em;
  }
  section{
    margin-bottom: 80px;
  }

  .back{
    cursor:pointer;
    color:#212F89;
    font-weight:600;
}

  @media (min-width: 768px) {
    .titleStyled{
      font-size: 2.5em;
      display: flex;
      flex-direction: column;
      gap: 25px;
      width: auto;
      span{
        &:first-child{
          margin-right: 400px;
        }
        &:last-child{
          margin-left: 140px;
        }
      }
    }
  }
  .container{
    padding: 0 25px;
  }
  .btnDefault,
  .btnPrimary{
    border:solid 1px;
    all: unset;
    padding: 15px 0;
    text-align: center;
    width: 180px;
    border-radius: 50px;
    cursor: pointer;
  }

  .btnDefault{
    border: 1px solid #F4F4F4;
    background-color: transparent;
    transition: all .3s ease-in-out;
    will-change: background-color, color;
  }

  
  .btnMore{
    padding: 15px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    border: 1px solid #212F89;
    margin-bottom: 80px;
    width:120px;
  }

  .hoverEffect{
    transition: all .3s ease-in-out;
    &:hover{
      cursor: pointer;
      background-color: transparent;
      color: #212F89;

      a{
        color: #212F89; 
      }
    }
  }

  .btnPrimary{
    text-transform: none;
    background-color: #212F89;
    color: #F4F4F4;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  
  .slideIndicatorContainer{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin: auto;
        @media (min-width: 768px){
            display: none;
        }
        .slideIndicator{
            width: 40px;
            height: 10px;
            border-radius: 5px;
            background: #147543;
            opacity: 0.3;
            transition: opacity .1s linear;
            will-change: opacity;
            &.current{
                background-color: #147543;
                opacity: 1;
            }
        }
    }

    .infoBackground{
        display: none;
        @media (min-width: 1024px){
            display: block;
            position: absolute;
            top: -150px;
            left: -25px;
            &.bottom{
                right: -25px;
                top: -218px;
                left: auto;
                transform: scale(-1, -1);
            }
        }
    }
    .bepVfn svg path:last-child {
    fill: rgb(255, 255, 255);
    }
    .bepVfn svg path {
    fill:#7159ad ;
    }
    .button#axeptio_btn_acceptAll {
      color: #7159AD!important;
    }

    .error{
      color: red;
      visibility: hidden;
      text-align: center;
      opacity: 0;
      will-change: opacity;
      transition: opacity linear .5s ;
      &.active{
        visibility: visible;
        opacity: 1;
      }
    }
`