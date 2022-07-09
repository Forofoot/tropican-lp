import React, { useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import Link from 'next/link';
import { useCookies } from "react-cookie";

const ProfileStyle = styled.section`
    text-align: center;
    padding: 50px 20px 0;
    @media(min-width: 768px){
        padding: 50px 140px 0;
    }
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
            @media(min-width: 768px){
                display: block;
                margin-left: 0;

            }
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
            @media(min-width: 768px){
                justify-content: start;
                &--btn{
                    margin-right: 15px;
                    width: 200px!important;
                    &:nth-child(3), &:nth-child(4){
                        display: none;
                    }
                }
            }
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-items: center;
            border-radius: 10px;
            margin-bottom: 100px;
            &--btn{
                display: flex;
                justify-content: center;
                flex-wrap:wrap ;
                margin-bottom: 15px;
                background: #212F89;
                width:47%;
                padding: 10px 35px;
                border-radius: 25px;
                a{
                    margin-left: 10px;
                    font-family: 'Sofia Pro';
                    font-style: normal;
                    font-weight: 700;
                    line-height: 150%;
                    color:#f4F4F4;
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
            &--subtitle{
                display: flex;
                justify-content: space-between;
                a{
                    color: black;
                }
            }
            &--album{
                display: flex;
                justify-content: space-around;
                div{
                    flex-wrap: wrap;
                    gap: 15px;
                }
                &-info{
                    p{
                        margin-right: 10px;
                    }
                    span{
                        font-family: 'Sofia Pro';
                        font-style: normal;
                        font-weight: 300;
                        }
                    }
                }
            }
        }

`

export default function Profile({profile}) {
    
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  
  const router = useRouter()

  useEffect(() => {
    if(!cookies.user){
        router.push('/experience/login')
    }
  },)

  const logout = (e) => {
    e.preventDefault()
    removeCookie("user",  {path: '/'})
    router.push('/experience/login')
  }
  return (
    <ProfileStyle>

        <div className='profil__photo'>
                <div>
                    <figure>
                        {profile?.avatar ? (
                            <Image
                                src={profile?.avatar}
                                alt={profile?.pseudo}
                                width={125}
                                height={125}
                            />
                        ) : (
                            <Image
                                src={'/logo.webp'}
                                alt={'photo de profil'}
                                width={125}
                                height={125}
                            />
                        )} 
                    </figure>
                    <Link href={`/experience/profile/modify/${profile?.pseudo}`}>
                        <a>
                            Modifier
                        </a>
                    </Link>
                </div>
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
                    src={'/profil/contact.webp'}
                    alt='logo icone contact'
                    width={25}
                    height={25} 
                />
                <Link href={`/experience/contact/addContact`}>
                    <a>
                        Relation
                    </a>
                </Link>
            </div>
            <div className='profil__actions--btn'>
                <Image
                    src={'/profil/sante.webp'}
                    alt='logo icone contact'
                    width={25}
                    height={25} 
                />
                <Link href={`/experience/contact/addContact`}>
                    <a>
                        Santé
                    </a>
                </Link>
            </div>
            <div className='profil__actions--btn'>
                <Image
                    src={'/profil/agenda.webp'}
                    alt='logo icone contact'
                    width={25}
                    height={25} 
                />
                <Link href={`/experience/planning/${profile?.pseudo}`}>
                    <a>
                        Agenda
                    </a>
                </Link>
            </div>
            <div className='profil__actions--btn'>
                <Image
                    src={'/profil/album.webp'}
                    alt='logo icone contact'
                    width={25}
                    height={25} 
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
            <div className='profil__grid--subtitle' >
                <p>Voyage avec Titouan </p>
                <p>
                    <Link href={'#'}>
                        <a>Voir plus</a>
                    </Link>
                </p>
                
            </div>
            <div className='profil__grid--album'>
                <div>
                    <figure>
                        <Image
                            src={"/profil/album_profil.png"}
                            alt="image de fond album"
                            width={165}
                            height={165}
                        />
                    </figure>
                    <div className='profil__grid--album-info'>
                    <p>
                        <Image
                            src={"/profil/mark-position.webp"}
                            alt="logo localisation"
                            width={15}
                            height={15}
                        />
                        Massif Central<br></br>
                        <span>23/06/22</span>
                    </p>
                    </div>
                </div>
                <div>
                    <figure>
                        <Image
                            src={"/profil/album_profil.png"}
                            alt="image de fond album"
                            width={165}
                            height={165}
                        />
                    </figure>
                    <div className='profil__grid--album-info'>
                    <p>
                        <Image
                            src={"/profil/mark-position.webp"}
                            alt="logo localisation"
                            width={15}
                            height={15}
                        />
                        Massif Central<br></br>
                        <span>23/06/22</span>
                    </p>
                    </div>
                </div>
            </div>
        </div>
        <button onClick={(e) => logout(e)}>Déconnexion</button>
    </ProfileStyle>
  )
}

export const getServerSideProps = async ({query}) => {
    const currentPseudo = query.pseudo


    try{
        const prisma = new PrismaClient();
        const findWhereGrandParent = await prisma.grandparent.findUnique({
            where:{
                pseudo: currentPseudo
            }
        })
        if(findWhereGrandParent){
            const profile = await prisma.grandparent.findUnique({
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
        const profile = await prisma.grandchildren.findUnique({
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
    }catch(e){
        console.log(e)
        return{
            redirect:'/experience/dashboard',
            permanent:false
        }
    }
    
}