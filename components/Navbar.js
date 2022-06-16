import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { useState } from 'react'

const HeaderStyle = styled.header`
  background:#F0E5C3;
  padding: 30px 55px;
  nav{
    display:flex;
    justify-content:space-between;
    .navLinks{
        @media (min-width:768px){
          display: none;
        }
        padding-left: 0;
        text-transform: uppercase;
        position: fixed;
        width: 100%;
        height: 100%;
        background: #F0E5C3;
        top: 0;
        transition: all .3s ease-in-out;
        left: -100%;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 2rem;
        text-align: center;
      li:first-child{
        margin-bottom: 35px;
      }
      &.opened{
        background: #F0E5C3;
        left: 0;
        transition: all .3s ease-in-out;
          .close{
          position: absolute;
          top:0;
          width: 50px;
          height: 50px;
          right: 55px;
          top: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          .closeline{
            width: 100%;
            height: 2px;
            background-color: #000;
            transform: rotate(45deg) translate(11px, -10px);
            &:last-child{
              transform: rotate(-45deg) translate(-7px, -7px);
            }
          }
          &:hover{
            cursor: pointer;
          }
        }
      }
      
    }
    
    .burger{
      display:flex;
      align-items:center;
      @media (min-width: 768px){
        display: none;
      }
    }

    .burgerContainer {
      display: flex;
      flex-direction: column;
      align-items:center;
      cursor: pointer;
      width: 30px;
    }

    .burgerline {
      width: 30px;
      height: 2px;
      background-color: #000;
      margin-top: 2.5px;
      margin-bottom: 2.5px;
      transition: all 0.3s ease;
      transform-origin: left;
      transform: scaleX(1);
    }

    .burgerContainer:hover{
      .burgerline:first-child{
        transition-delay: 100ms;
        transform: scaleX(0);
      }
      .burgerline:nth-child(2){
        transition-delay: 200ms;
        transform: scaleX(0);
      }
      .burgerline:last-child{
        transition-delay: 300ms;
        transform: scaleX(0);
      }
    }
  }
`

export default function Navbar() {
  const [active, setActive] = useState(false)
    
  return (
    <HeaderStyle>
        <nav>
          <div onClick={() => setActive(!active)} className="burger">
            <div className="burgerContainer">
              <span className="burgerline"></span>
              <span className="burgerline"></span>
              <span className="burgerline"></span>
            </div>
          </div>
          <Link href="#">
            <a>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={53}
                height={53}
              />
            </a>  
          </Link>
          <aside className={`navLinks ${active ? "opened" : ""}`}>
              <div className="close" onClick={() => setActive(!active)}>
                <div className="closeline"></div>
                <div className="closeline"></div>
              </div>
              <ul >
                <li>
                  <Link href="#section1">
                    <a onClick={() => setActive(!active)}>À propos</a>
                  </Link>
                </li>
                <li>
                  <Link href="#section2">
                    <a onClick={() => setActive(!active)}>Contact</a>
                  </Link>
                </li>
              </ul>
          </aside>
          
        </nav>
        
    </HeaderStyle>
  )
}