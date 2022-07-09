import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";
import { useRouter } from "next/router"

const HeaderStyle = styled.header`
  //background:#42A0B6;
  padding: 30px 55px;
  //border-radius: 0 0 25px 25px;
  nav{
    display:flex;
    justify-content:space-between;
    .active{
      a{
        color:#F20D97;
      }
    }
    .logoMobile{
      width: 53px;
      height: 53px;
      position: relative; @media (min-width: 768px){
        display: none;
      }
    }
    .logoDesktop{
      display: none;
      @media (min-width: 768px){
        display: block;
        width: 187px;
        height: 32px;
        position: relative;
      }
    }
    .navLinks{
        @media (min-width:768px){
          display: none;
        }
        padding: 0 30px;
        position: fixed;
        width: 75%;
        height: 100%;
        background-color: #F4F4F4;
        top: 0;
        will-change:left;
        transition: left .3s ease-in-out;
        left: -100%;
        z-index: 5;
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: 1rem;
        text-align: center;
        ul{
          text-align: left;
          li{
          margin-bottom: 35px;
          padding-bottom: 20px;
          border-bottom: 2px solid #212F89;
          &:last-child{
            margin-bottom: 0;
          }
          a{
            display: flex;
            align-items: center;
            gap: 15px;
          }
        }
        }
      &.opened{
        left: 0;
        transition: left .3s ease-in-out;
          .close{
          position: absolute;
          top:0;
          width: 80px;
          height: 50px;
          left: 30px;
          top: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          .closeline{
            width: 100%;
            height: 2px;
            background-color: #7159AD ;
            transform: rotate(45deg) translate(11px,-11px);
            &:last-child{
              transform:rotate(-45deg) translate(-16px,-16px);
            }
          }
          &:hover{
            cursor: pointer;
          }
        }
      }
      
      
    }
    @media (min-width:768px){
      .navLinks{
        display: none;
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
      background-color: #7159AD;
      margin-top: 2.5px;
      margin-bottom: 2.5px;
      will-change: transform;
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
    .desktopLinks{
      display: none;
      @media (min-width: 768px){
        gap: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    a{
      color:#313131;
    }
  }
`

export default function Navbar() {
  const [active, setActive] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setCurrentUser(cookies.user)
  }, [cookies.user])

  const router = useRouter();
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
            <a className="logoMobile">
              <Image
                src="/logo.webp"
                alt="Logo"
                layout='fill'
                objectFit='contain'
              />
            </a> 
          </Link>

          <Link href="#">
            <a className="logoDesktop">
              <Image
                src="/logo-full.webp"
                alt="Logo"
                layout='fill'
                objectFit='contain'
              />
            </a>  
          </Link> 
          <aside className={`navLinks ${active ? "opened" : ""}`}>
              <div className="close" onClick={() => setActive(!active)}>
                <div className="closeline"></div>
                <div className="closeline"></div>
              </div>
              {router.pathname == '/' ? (
                <ul>
                  <li>
                    <Link href="#section1">
                      <a onClick={() => setActive(!active)}>Tropican</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#section2">
                      <a onClick={() => setActive(!active)}>Qui sommes-nous ?</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#section3">
                      <a onClick={() => setActive(!active)}>Vos retours</a>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li className={router.pathname == "/experience/profile/[pseudo]" || router.pathname == "/experience/profile/modify/[pseudo]" ? "active" : ""}>
                    <Link href={`/experience/profile/${currentUser?.pseudo}`}>
                      <a>
                        <Image
                          src={'/navbar/profile.webp'}
                          alt={'Icon profile'}
                          width={30}
                          height={30}
                        />
                        Profil
                      </a>
                    </Link>
                  </li>
                  <li className={router.pathname == `/experience/map/[pseudo]` ? "active" : ""}>
                    <Link href={`/experience/map/${currentUser?.pseudo}`}>
                      <a>
                        <Image
                          src={'/navbar/map.webp'}
                          alt={'Icon profile'}
                          width={30}
                          height={30}
                        />
                        Carte
                      </a>
                    </Link>
                  </li>
                  <li className={router.pathname == "/experience/dashboard" ? "active" : ""}>
                    <Link href='/experience/dashboard'>
                      <a>
                        <Image
                          src={'/navbar/album.webp'}
                          alt={'Icon profile'}
                          width={30}
                          height={30}
                        />
                        Mes albums
                      </a>
                    </Link>
                  </li>
                  <li className={router.pathname == "/blog" ? "active" : ""}>
                    <Link href='/blog'>
                      <a>
                        <Image
                          src={'/navbar/blog.webp'}
                          alt={'Icon profile'}
                          width={30}
                          height={30}
                        />
                        Le blog
                      </a>
                    </Link>
                  </li>
                </ul>
              )}
          </aside>
          {router.pathname == '/' ? (
          <ul className='desktopLinks'>
            <li>
              <Link href="#section1">
                <a>Tropican</a>
              </Link>
            </li>
            <li>
              <Link href="#section2">
                <a>Qui sommes-nous ?</a>
              </Link>
            </li>
            <li>
              <Link href="#section3">
                <a>Vos retours</a>
              </Link>
            </li>
          </ul>
          ) : (
            <ul className='desktopLinks'>
              <li className={router.pathname == "/experience/profile/[pseudo]" || router.pathname == "/experience/profile/modify/[pseudo]" ? "active" : ""}>
                <Link href={`/experience/profile/${currentUser?.pseudo}`}>
                  <a>
                    Profil
                  </a>
                </Link>
              </li>
              <li className={router.pathname == `/experience/map/[pseudo]` ? "active" : ""}>
                <Link href={`/experience/map/${currentUser?.pseudo}`}>
                  <a>
                    Carte
                  </a>
                </Link>
              </li>
              <li className={router.pathname == "/experience/dashboard" ? "active" : ""}>
                <Link href='/experience/dashboard'>
                  <a>
                    Mes albums
                  </a>
                </Link>
              </li>
              <li className={router.pathname == "/blog" ? "active" : ""}>
                <Link href='/blog'>
                  <a>
                    Le blog
                  </a>
                </Link>
              </li>
            </ul>
            )
          }
        </nav>
        
    </HeaderStyle>
  )
}