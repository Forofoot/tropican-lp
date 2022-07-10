import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import React, { useState, useEffect, useCallback } from 'react'
import { useCookies } from "react-cookie";
import { useRouter } from "next/router"

const HeaderStyle = styled.header`
  //background:#42A0B6;
  padding: 30px 55px;
  //border-radius: 0 0 25px 25px;
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
    }
    @media (min-width:768px){
      .navLinks{
        display: none;
      }
    }
  .notificationPopup{
    width: 400px;
    min-height: 70vh;
    background-color: #fff;
    position: fixed;
    z-index: 10;
    left: 50%;
    top: 50%;
    display: none;
    transform: translate(-50%,-50%);
    &.visible{
      display: block;
    }
    
    .close{
      display: block;
      margin-left: auto;
      cursor: pointer;
      width: 45px!important;
      position: relative;
      padding: 50px 0;
      left: auto;
      top: auto;
      .closeline{
        transform: rotate(45deg) translate(-14px,15px);
        &:last-child{
          transform:rotate(-45deg) translate(-16px,-16px);
        }
      }
    }
    .notificationSection{
      display: flex;
      margin-bottom: 30px;
      position: relative;
      p{
        width: 50%;
        text-align: center;
        color: #212F89;
        border-bottom: 1px solid #212F89;
        padding-bottom: 5px;
        font-weight: 100;
        cursor: pointer;
        &.active{
          font-weight: bold;
          border-bottom: 3px solid #212F89;
        }
      }
    }
    .notificationContainer{
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      div{
        width: 100%;
      }
      .result{
        padding: 20px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #F20D97;
        border-radius: 10px;
        width: 100%;
        .resultPicture{
          display: flex;
          align-items: center;
          gap: 15px;
        }
        button{
          all: unset;
          cursor: pointer;
          background-color: #F20D97;
          min-width: 35px;
          min-height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          margin-right: 10px;
          &:last-of-type{
            margin-right: 0;
          }
        }
      }
    }
  }
  nav{
    display:flex;
    justify-content:space-between;
    .active{
      a{
        color:#F20D97;
      }
    }
    .notificationIcon{
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      &.active{
        &::after{
          content: '';
          width: 10px;
          height: 10px;
          background-color: #F20D97;
          border-radius: 100%;
          position: absolute;
          top: 0;
          right: 0;
        }
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
  const [datas, setDatas] = useState([])
  const [notificationPopUp, setNotificationPopUp] = useState(false)
  const [currentSection, setCurrentSection] = useState('notifications')


  const router = useRouter();



  console.log(cookies.user)

  const fetchData = useCallback(async () => {
    if(cookies.user){
      const response = await fetch(`/api/contact/friendRequest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudo: cookies?.user.pseudo
        })
      });
      const json = await response.json()
      if(response.ok){
        setDatas(json)
      }
    }
    
  }, [])


  useEffect(() => {
    setCurrentUser(cookies.user)

    fetchData()
  }, [cookies.user, fetchData])


  const handleCreateRelation = async( relationId, sender ) =>{
    try{
      fetchData()
      const res = await fetch('/api/notification/accept', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          relationID: relationId,
          sender: sender,
          currentUser: currentUser?.pseudo
        }),
    });
    fetchData()
    }catch(e){
      console.log(e)
    }
  }

  const handleDeleteRelation = async( relationId, sender) => {
    try{
      const res = await fetch('/api/notification/reject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          relationID: relationId,
          sender: sender,
          currentUser: currentUser?.pseudo
        }),
    });
    fetchData()
    }catch(e){
      console.log(e)
    }
  }
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
              <li className={`notificationIcon ${datas.length ? (
                'active'
              ) : (
                ''
              )}`} onClick={() => setNotificationPopUp(!notificationPopUp)}>
                <Image
                  src={'/navbar/notification.webp'}
                  alt={'Icon notification'}
                  width={20}
                  height={22}
                />
              </li>
            </ul>
            )
          }
        </nav>
        <div className={`notificationPopup ${notificationPopUp == true ? ('visible') : ('')}`}>
          
          <div className="close" onClick={() => setNotificationPopUp(!notificationPopUp)}>
            <div className="closeline"></div>
            <div className="closeline"></div>
          </div>
          <div className='notificationSection'>
            <p className={`${currentSection == 'notifications' ? ('active') : ('')}`} onClick={() => setCurrentSection('notifications')}>Notifications</p>
            <p className={`${currentSection == 'demandes' ? ('active') : ('')}`} onClick={() => setCurrentSection('demandes')}>Demandes</p>
          </div>
          <div className='notificationContainer'>
            {currentSection == 'demandes' &&
              <>
              {datas.length ? (
                <>
                {datas?.map((elt, i) => (
                  <div key={i} className='result'>
                  {elt.sender !== currentUser?.role &&
                  <>
                    <div className='resultPicture'>
                        {elt.grandparent?.avatar || elt.grandChildren?.avatar ? (
                          <Image
                            src={`${elt.grandparent?.avatar || elt.grandChildren?.avatar}`}
                            alt={`Avatar de ${elt.grandparent?.pseudo || elt.grandChildren?.pseudo}`}
                            height={39}
                            width={39}
                            layout='raw'
                            />
                        ) : (
                          <Image
                            src={'/logo.webp'}
                            alt={`Avatar de ${elt.grandparent?.pseudo || elt.grandChildren?.pseudo}`}
                            height={39}
                            width={39}
                            layout='raw'
                          />
                        )}
                        <p>{elt.grandChildren?.pseudo || elt.grandparent?.pseudo}</p>
                      </div>
                      <button onClick={() => handleCreateRelation(elt.grandParent_id || elt.grandChildren_id, elt.sender)}>
                        <Image
                          src={'/tools/validIcon.webp'}
                          alt='Valider'
                          width={18}
                          height={18}
                        />
                      </button>
                      <button onClick={() => handleDeleteRelation(elt.grandParent_id || elt.grandChildren_id, elt.sender)}>
                        <Image
                          src={'/tools/refuse.webp'}
                          alt='Refuser'
                          width={18}
                          height={18}
                        />
                      </button>
                  </>
                  }
                  </div>
                ))}
                </>
              ) : (
                <>
                  <p>Aucune demande d&apos;ami</p>
                </>
              )}
              </>
            }
            {currentSection == 'notifications' && 
              <>Notifications</>
            }
          </div>
        </div>
    </HeaderStyle>
  )
}