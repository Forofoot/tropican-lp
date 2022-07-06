import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import Link from 'next/link';
import { useCookies } from "react-cookie";

const ProfileStyle = styled.section`
    text-align: center;
    padding: 50px 20px 0;
    .profil{
        &__photo{
            width: 100px;
            height: 100px;
            border-radius: 50px;
            display: flex;
            align-items: stretch;
            overflow: hidden;
            margin-left: 50%;
            transform: translateX(-50%);
            margin-bottom: 20px;
        }
        &__name{
            font-family: 'Mark Pro';
            font-size: 1.25rem;
            font-weight: 700;
        }
        &__pseudo{
            display: flex;
            justify-content: center;
            margin-bottom: 40px;
            p{
                padding: 5px 15px;
                border-radius: 25px 0px 0px 25px;
                border: 1px solid #694BB5;
                color: #694BB5;
                font-weight: 800;
            }
            a{
                background: #694BB5;
                padding: 5px 18px 5px 12px;
                border-radius: 0px 25px 25px 0px;
                color: white;
            }
        }
        &__actions{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
            border-radius: 10px;
            margin-bottom: 100px;
            &--btn{
                display: flex;
                justify-content: center;
                flex-wrap:wrap ;
                margin-bottom:15px;
                background: #212F89;
                width:100%;
                padding: 10px 45px;
                border-radius: 25px;
                a{
                    margin-left: 10px;
                    font-family: 'Sofia Pro';
                    font-style: normal;
                    font-weight: 700;
                    line-height: 150%;
                    color:#f4F4F4;
                }
                &:nth-child(2){
                    width: 47%;
                    padding: 10px 20px;
                    margin-right: 15px
                }
                &:nth-child(3){
                    width: 47%;
                    padding: 10px 20px;
                }
            }
        }
        &__grid{
            p{
                text-align: start;
                font-family: 'Mark Pro';
                font-weight: 700;
                margin-bottom: 30px;
            }
            &--title{
                font-family: 'Sofia Pro';
                font-weight: 300;
                font-style: normal;
            }
            &--album{
                display: flex;

                Image{

                }
                }
            }
        }

`

export default function Profile({profile}) {
    
  const [cookies,setCookie, removeCookie] = useCookies(["user"]);

  const [currentUser, setCurrentUser] = useState(null)
  
  const router = useRouter()

  useEffect(() => {
    setCurrentUser(cookies.user)
    if(!cookies.user){
        router.push('/experience/login')
    }
  }, [cookies.user])

  const logout = (e) => {
    e.preventDefault()
    removeCookie("user")
    setCurrentUser(null)
    router.push('/experience/login')
  }
  return (
    <ProfileStyle>
        <button onClick={(e) => logout(e)}>Déconnexion</button>

        <div className='profil__photo'>
            <figure>
            </figure>
        </div>
        
        <p className='profil__name'>{profile?.firstName} {profile?.lastName}</p>
        <div className='profil__pseudo'>
            <p>{profile?.pseudo}</p>
            <Link href={'#'}>
                <a>
                    Partager
                </a>
            </Link>
        </div>
        <div className='profil__actions'>
            <div className='profil__actions--btn'>
                <Image
                    src={'/../public/profil/contact.png'}
                    alt='logo icone contact'
                    width={20}
                    height={20} 
                />
                <Link href={`/experience/contact/addContact`}>
                    <a>
                        Ajouter un contact
                    </a>
                </Link>
            </div>
            <div className='profil__actions--btn'>
                <Image
                    src={'/../public/profil/agenda.png'}
                    alt='logo icone contact'
                    width={20}
                    height={20} 
                />
                <Link href={`/experience/planning/${profile?.pseudo}`}>
                    <a>
                        Agenda
                    </a>
                </Link>
            </div>
            <div className='profil__actions--btn'>
                <Image
                    src={'/../public/profil/album.png'}
                    alt='logo icone contact'
                    width={20}
                    height={20} 
                />
                <Link href={'#'}>
                    <a>
                        Album
                    </a>
                </Link>
            </div>
        </div>
        <div className='profil__grid'>
            <p className='profil__grid--title'>Mes photos</p>
            <p>Voyage avec Titouan </p>
            <div className='profil__grid--album'>
            {profile?.experience.map((exp,i) =>(
                <figure key={i}>
                    {exp?.image.map((img, index) =>(
                        <figure key={index}>
                            <Image
                                src={img.image}
                                alt='bamako'
                                height={190}
                                width={190}
                            />
                        </figure>
                    ))}
                    <p >{exp.name}</p>
                </figure>
                ))}
            </div>
        </div>
        <div className='profil__grid'>
            <p className='profil__grid--title'>Mes photos</p>
            <p>Voyage avec Titouan </p>
            <div className='profil__grid--album'>
                {profile?.experience.map((exp,i) =>(
                    <figure key={i}>
                        {exp?.image.map((img, index) =>(
                            <figure key={index}>
                                <Image
                                    src={img?.image}
                                    alt='bamako'
                                    height={180}
                                    width={180}
                                />
                            </figure>
                        ))}
                        
                    </figure>
                ))}
            </div>
        </div>
    </ProfileStyle>
  )
}

export const getServerSideProps = async ({query}) => {
    // Fetch data from external API
    //const cookie = parseCookies(req)
    const prisma = new PrismaClient();
    const currentPseudo = query.pseudo

    const findWhereGrandParent = await prisma.grandparent.findFirst({
        where:{
            pseudo: currentPseudo
        }
    })
    if(findWhereGrandParent){
        const profile = await prisma.grandparent.findFirst({
        where:{
            pseudo:currentPseudo
        },
        select:{
            firstName:true,
            lastName: true,
            pseudo:true,
            avatar:true,
            experience:{
                select:{
                    name:true,
                    place:true,
                    grandChildren:{
                        select:{
                            firstName:true
                        }
                    },
                    image:{
                        select:{
                            image: true
                        }
                    }
                }
            }
        }
        })
        await prisma.$disconnect()
        return{
        props:{
                profile
            }
        }
    }
    const profile = await prisma.grandchildren.findFirst({
        where:{
            pseudo:currentPseudo
        },
        select:{
            firstName:true,
            lastName: true,
            pseudo:true,
            avatar:true,
            experience:{
                select:{
                    name:true,
                    place:true,
                    grandParent:{
                        select:{
                            firstName:true
                        }
                    },
                    image:{
                        select:{
                            image: true
                        }
                    }
                }
            }
        }
    })
    await prisma.$disconnect()
    return{
        props:{
            profile
        }
    }
}