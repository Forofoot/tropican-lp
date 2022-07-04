import React from 'react'
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import Link from 'next/link';

const ProfileStyle = styled.section`
    text-align: center;
    padding-top: 50px;
    figure{
        margin-bottom: 15px;
    }
    a{
        color: violet;
    }
    .actions{
        display: flex;
        justify-content: center;
        gap: 15px;
    }
`

export default function Profile({profile}) {
  return (
    <ProfileStyle>
        <figure>
            <Image
                src={profile.avatar}
                alt='Photo de profil'
                width={50}
                height={50}
            />
        </figure>
        <p>{profile.firstName} {profile.lastName}</p>
        <div>
            <p>{profile.pseudo}</p>
            <Link href={'#'}>
                <a>
                    Partager
                </a>
            </Link>
        </div>
        <div className='actions'>
            <Link href={'#'}>
                <a>
                    Ajouter un contact
                </a>
            </Link>
            <Link href={'#'}>
                <a>
                    Agenda
                </a>
            </Link>
            <Link href={'#'}>
                <a>
                    Album
                </a>
            </Link>
        </div>
        <div>
            Mes photos
            {profile.experience.map((exp,i) =>(
                <figure key={i}>
                    {exp.image.map((img, index) =>(
                        <figure key={index}>
                            <Image
                                src={img.image}
                                alt='bamako'
                                height={195}
                                width={195}
                            />
                        </figure>
                    ))}
                    <p >{exp.name}</p>
                </figure>
                
                
            ))}
        </div>
    </ProfileStyle>
  )
}

export const getServerSideProps = async ({query}) => {
    // Fetch data from external API
    //const cookie = parseCookies(req)
    const prisma = new PrismaClient();
    const currentPseudo = query.pseudo

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
                image:{
                    select:{
                        image: true
                    }
                }
            }
        }
    }
    })
    return{
    props:{
        profile
        }
    }
}