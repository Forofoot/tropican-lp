import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { parseCookies } from "../../helpers"
import { useCookies } from "react-cookie"
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import { FaSwimmer } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import { GiHealthNormal } from 'react-icons/gi';
import { MdSportsBasketball } from 'react-icons/md';
import Brands from '../../components/Brands';
import { useRouter } from 'next/router'
import Image from 'next/image';

const HomeStyle = styled.section`
padding: 30px 15px 0px;
h2{
    margin-bottom:20px;
    text-align:center;
    color:#212F89;
}

.square{
    position: relative;
    text-align:center;
    transform: matrix(0.99, -0.01, -0.1, 1, 0, 0);
    background-color: rgba(131, 215, 220, 0.4);
    width: 80%;
    height:200px;
    padding:20px 30px;
    display:flex;
    align-items:center;
    margin:auto;
    margin-bottom:30px;

    h1{
        color:#212F89;
    }
    
    :before{
        content:"";
        position: absolute;
        transform: matrix(0.99, -0.01, -0.1, 1, 0, 0);
        border: solid 2px #212F89;
        width: 100%;
        height:100%;
        top:-5px;
        left:10px;
    }
}

p{
    text-align:center;
    margin-bottom:30px;
}

.btn{
    background-color: #7159AD;
    color: #F4F4F4;
    width:fit-content;
    padding: 15px 30px;
    text-align: center;
    border-radius: 50px;
    margin:auto;
    margin-bottom:50px;

    

    a{
        display:flex;    

        .add{
            margin-left:10px;
            color:#F20D97;
            background-color:#fff;
            border-radius:50%;
            width:30px;
            height:30px;
            display:flex;
            align-items:center;
            justify-content:center;
        }
    }
}

.cardsContainer{
    margin-bottom:70px;

    .cardExperience{
        width: 90vw;
        background-color: #F20D97;
        border-radius:10px;
        display: flex;
        align-items:center;
        padding:10px 20px;
        font-weight: 600;
        margin-bottom:20px;

        .icon{
            color:#fff;
            font-size:3em;
            margin-right:25px;
        }

        .cardContent{
            p{
                text-align:left;
                margin:0;
            }
        }
    }
}

.healthCardsContainer{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-around;
    margin-bottom:30px;

    .cardHealth{
        width:43vw;
        height:200px;
        padding:15px;
        text-align:center;
        background-color:rgba(107, 134, 255, 0.6);
        border-radius:10px;
        margin-bottom:15px;

        .iconImg{
            width:50px;
            height:50px;
            border-radius:50%;
            background-color:#fff;
            display:flex;
            align-items:center;
            justify-content:center;
            margin:auto;
            margin-bottom:20px;
        }
    }
}
.stats{
    border: dashed 4px #F20D97;
    border-radius:5px;
    text-align: center;
    padding: 15px 10px;
    margin-bottom: 50px;
}

.aboutContainer{
margin-bottom:30px;
    .aboutCard{
        color:#fff;
        border-radius:10px;
        margin:10px;
        padding:20px;

        h3{
            color:#fff;
        }

        :first-child{
            background-color: #694BB5;
        }
        :nth-child(2){
            background-color: rgba(242, 13, 151, 0.6);;
        }
        :last-child{
            background-color: #6B86FF;;
        }
        
        h2{
            color:#fff;
        }
}

}

`

export default function Home({ profile }) {
    const router = useRouter()
    const [cookies] = useCookies(["user"])
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        setCurrentUser(cookies.user)
    }, [cookies.user])

    useEffect(() => {
        if (!cookies.user) {
            router.push('/experience/login')
        }
    })

    const [swim, setswim] = useState('nager')
    return (
        <HomeStyle>
            <div>
                <div className="square">
                    <h1>Leste, la légereté exaltée !</h1>
                </div>
                <p>Leste vous permet de renforcer vos magnifiques liens avec vos petits-enfants, en vous proposant des expériences extraordinaires à votre images.</p>


                <div className="btn">
                    <Link href="/experience/quizz"><a>Nouvelle expérience <span className="add"><AiOutlinePlus /></span></a></Link>
                </div>

                <h2>Expériences prévues</h2>
                <div className="cardsContainer">
                    {profile?.experience.map((exp, i) => (
                        <div key={i} className="cardExperience">
                            <div className="icon">
                                <BsCalendarDate />
                            </div>
                            <div className="cardContent">
                                <p className="date">{exp.date}</p>
                                <p className="participant">Evènement prévu avec </p>
                            </div>
                        </div>
                    ))}

                </div>



                <h2>Rappel de vos informations</h2>
                <div className="healthCardsContainer">

                    <div className="cardHealth">
                        <div className="iconImg">
                            <FaSwimmer />
                        </div>
                        <div className="cardContent">
                            {profile?.swim !== 'nager' ? (
                                <>
                                    <p>Sait nager</p>
                                </>
                            ) : (
                                <>
                                    <p>Ne sait pas nager</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* {profile.map((elt, i) => ( */}
                    <div className="cardHealth">
                        <div className="iconImg">
                            <BsFillEyeFill />
                        </div>
                        <div className="cardContent">
                            <p className="date">Date</p>
                        </div>
                    </div>
                    {/* ))} */}

                    {/* {profile.map((elt, i) => ( */}
                    <div className="cardHealth">
                        <div className="iconImg">
                            <GiHealthNormal />
                        </div>
                        <div className="cardContent">
                            <p className="date">Date</p>
                        </div>
                    </div>
                    {/* ))} */}

                    {/* {profile.map((elt, i) => ( */}
                    <div className="cardHealth">
                        <div className="iconImg">
                            <MdSportsBasketball />
                        </div>
                        <div className="cardContent">
                            <p className="date">Date</p>
                        </div>
                    </div>
                    {/* ))} */}

                </div>
                <h2>Pourquoi nous ?</h2>
                <div className="aboutContainer">
                    <div className="aboutCard">
                        <h3>Qui sommes-nous ?</h3>
                        <p>Leste est un dispositif incroyable ! Nous vous organisons différentes expériences de voyages et d&apos;activités entre vous et vos petits-enfants, qui seront inoubliables.</p>
                    </div>
                    <div className="aboutCard">
                        <h3>Nos valeurs</h3>
                        <p>La découverte, l&apos;amour et le rapprochement sont nos trois merveilleuses valeurs que nous prônons.</p>
                    </div>
                    <div className="aboutCard">
                        <h3>Nos valeurs</h3>
                        <p>Avec la participation de nos admirables partenaires tels que la SNCF ou Easyjet, Leste se charge de toute l&apos;organisation et l&apos;accompagnement de votre extraordinaire expérience. </p>
                    </div>
                </div>

                <div className="stats">
                    <h2>98%</h2>
                    <p>des grands-parents et des petits-enfants ont fini leur formidable première expérience satisfaits.</p>
                </div>

                <Brands />
            </div>
        </HomeStyle>
    );
}


export const getServerSideProps = async ({ req, res }) => {
    try {
        const cookie = parseCookies(req)
        if (res) {
            if (cookie.user) {
                const parsedUser = JSON.parse(cookie.user)
                const prisma = new PrismaClient()
                if (parsedUser.role == 'grandparent') {
                    const profile = await prisma.grandparent.findUnique({
                        where: {
                            pseudo: parsedUser.pseudo
                        },
                        select: {
                            firstName: true,
                            lastName: true,
                            pseudo: true,
                            healthissue: true,
                            swim: true,
                            sportaddict: true,
                            vision: true,
                            experience: {
                                select: {
                                    name: true,
                                    place: true,
                                    start: true,
                                    grandChildren: {
                                        select: {
                                            firstName: true
                                        }
                                    }
                                }
                            }
                        }
                    })
                    await prisma.$disconnect()
                    return {
                        props: {
                            profile
                        }
                    }
                } else {
                    const profile = await prisma.grandchildren.findUnique({
                        where: {
                            pseudo: parsedUser.pseudo
                        },
                        select: {
                            firstName: true,
                            lastName: true,
                            pseudo: true,
                            healthissue: true,
                            swim: true,
                            sportaddict: true,
                            vision: true,
                            experience: {
                                select: {
                                    name: true,
                                    place: true,
                                    start: true,
                                    grandParent: {
                                        select: {
                                            firstName: true
                                        }
                                    }
                                }
                            }
                        }
                    })
                    await prisma.$disconnect()
                    return {
                        props: {
                            profile
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
        return {
            redirect: {
                destination: '/experience/login',
                permanent: false
            }
        }
    }
}
