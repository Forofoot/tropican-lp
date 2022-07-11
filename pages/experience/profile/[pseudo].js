import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import Link from 'next/link';
import { useCookies } from "react-cookie";
import toast, { Toaster } from 'react-hot-toast';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; //
import { DateRangePicker } from 'react-date-range'; 

import moment from 'moment';
import 'moment/locale/fr';

import Head from 'next/head';

const ProfileStyle = styled.section`
    text-align: center;
    padding: 50px 20px 0;
    @media(min-width: 768px){
            .profil__icone{
                display: none!important;
            }
        }
    @media(max-width:768px){
        .profilChoiceBlock{
        display: flex;
        flex-wrap: wrap!important;
        justify-content: space-between;
    }
    .profilChoice{
        display:flex;
        gap: 15px;
        width: 45%;
        background: #212F89;
        border-radius: 25px;
        margin-bottom: 30px;
        padding: 10px 19px;
        color: white;
        justify-content: center;
        .profil__icone{
            display: block;
            text-align: center;
        }
    }

}
   
    .deco{
        margin: 30px 0;
        color: #212F89;
        padding: 10px 35px;
        border-radius: 25px;
        border: 1px solid #212F89;
        cursor:pointer;
    }
    .rdrDefinedRangesWrapper{
        display: none;
    }
    .rdrDateRangePickerWrapper{
        margin-bottom: 45px;
    }
    @media(min-width: 768px){
        padding: 50px 140px 0;
        .mobile{
            display: none!important;
        }
        .display__desktop{
            display: flex;
            .experienceBlock{
                display: flex;
                flex-direction:column;
                gap: 30px;
                padding-top: 25px;
            }
            .rdrDateRangePickerWrapper,
            .rdrMonth{
                width: 600px;
            }
        }

        .profilChoiceBlock{
        display:flex;
        flex-wrap: nowrap;
        
        .profilChoice {
            width: 50%;
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #212F89;
            color : #212F89;
            margin-bottom: 40px;
            font-weight: 700;
            font-size: 1.1rem;
            cursor:pointer;
            &.active{
                border-bottom: 3px solid #212F89;
            }
            &:nth-child(4){
                display: none;
            }
        }
    }
    }
    .profil{
        &__desktop{
            display: none;
            @media(min-width:768px){
                display: flex;
                margin-bottom: 30px;
                align-items: center;
                &--info{
                    height: fit-content;
                    .info--pseudo{
                        font-family: 'Mark Pro';
                        font-style: normal;
                        font-weight: 700;
                        font-size: 1.25rem;
                        margin-bottom: 15px;
                        p{
                            text-align: start;
                        }
                    }
                    .info--link{
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        p{
                            padding:2px 20px;
                            border: solid 1px #694BB5;
                            border-radius: 25px;
                            color: #694BB5;
                            min-width: 120px;
                        }
                        a{
                            padding:5px 20px;
                            border: solid 1px #F20D97;
                            border-radius: 25px;
                            font-family: 'Sofia Pro';
                            font-style: normal;
                            font-weight: 400;
                            color: #F20D97;
                        }
                        
                    }
                }
                &--img{
                    margin-right: 45px;
                    position: relative;
                    .modif{
                        position: absolute;
                        right: -20px;
                        bottom: -20px;
                    }
                }
            }
        }
        &__photo{
            width: 100px;
            height: 100px;
            border-radius: 50px;
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
            @media(min-width: 768px){
                justify-content: start;
                &--btn{
                    margin-right: 15px;
                    width: 200px!important;
                    &:nth-child(3), &:nth-child(2){
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
            @media(min-width: 768px){
                display: none;
            }
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
        .profil{
            &__grid--desktop{
                width: 100%;
                &-title{
                    text-align: start;
                    margin-bottom: 20px;
                    font-weight: 700;
                    font-family: 'Mark Pro';
                    font-size: 1.125rem;
                }
                &-subtitle{
                    display: flex;
                    justify-content: space-between;
                    color: #212F89;
                    margin-bottom: 15px;
                    font-family: 'Sofia Pro';
                    font-style: normal;
                    font-weight: 300;
                    a{
                        color: #212F89;
                    }
                }
                &-album{
                    display: flex;
                    justify-content:space-around;
                    gap: 20px;
                    .album__card--info{
                        text-align: start;
                    }
                }
            }
        }
        @media(max-width: 768px){
            .album__card{
                &:nth-child(3), &:nth-child(4){
                    display: none;
                }
            }
        }
        .sante__container{
            @media(max-width:768px){
                .infosQuestion{
                    padding: 55px!important;
                }
            }
            margin: auto;
            margin-bottom: 30px;
            .infosQuestion{
            background-color:rgba(131, 215, 220, 0.4);
            padding: 55px 80px;
            border-radius: 20px;
            width:100%;
            margin: auto;
            h2{
                display: none;
            }
            .answer{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        .choice{
            padding: 10px 0 ;
            max-width: 165px;
            width: 100%;
            border: 1px solid #212F89;
            border-radius: 10px;
            text-align: center;
            display: inline-block;
            font-size: 1rem;
            &:last-of-type{
                margin-bottom   : 0;
            }
            &:hover{
                cursor: pointer;
            }
            &.active{
                background: pink;
            }
        }
        }
        .questionBlock{
            margin-bottom: 30px;
            .question{
                margin-bottom: 15px;
            }
        }
 
        
        .desktopInfosDescription{
            display: block;
            text-align:center;
            color: #313131;
            margin-bottom: 40px;
        }

        }
        
`
let daysOfYear = [];

export default function Profile({profile, date, relation}) {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    
    const handleSelect = ( ranges ) =>{
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    date?.experience.forEach(pro => {
        for (let d = pro.start; d <= pro.end; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(new Date(d));
        }
    });
    
    profile?.experience.forEach(aa => {
        aa.start = moment(aa.start).format('l')
        aa.end = moment(aa.end).format('l')
    })
    
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [profilChoice, setProfilChoice] = useState('photo')

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
    toast.success('Déconnecté')
  }
  const [value, setValue] = useState({
    start: new Date(),
    end: new Date(),
    pseudo: "",
    relationId: "",
    healthIssue: relation?.healthissue,
    sportAddicted: relation?.sportaddict,
    swim: relation?.swim,
    mobility: relation?.mobility,
    vision: relation?.vision,
    language: relation?.language,
    audition: relation?.audition
});


  return (

    <>
        <Head>
        <title>Leste - Profil</title>
        <meta
          name="description"
          content="Page profil du dispositif Leste, ici vous pouvez modifier vos infos utilisateur, regarder vos prochains voyages et vos dernières photos."
        />
      </Head>
    <ProfileStyle>
        <Toaster />
        <div className='profil__photo mobile'>
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
            <p className='profil__name mobile'>{profile?.firstName} {profile?.lastName}</p>
            <div className='profil__pseudo mobile'>
                <p>{profile?.pseudo}</p>
                <Link href={'#'}>
                    <a>
                        Partager
                    </a>
                </Link>
            </div>

        <div className='profil__desktop'>
            <div className='profil__desktop--img'>
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
                <div className='modif' >
                    
                    <Link href={`/experience/profile/modify/${profile?.pseudo}`}>
                    <Image 
                        src={'/profil/edit.webp'}
                        alt="icon crayon"
                        width={35}
                        height={35} 
                    />
                    </Link>
                </div>
            </div>
            <div className='profil__desktop--info'>
                <div className='info--pseudo'>
                    <p>{profile?.firstName} {profile?.lastName}</p>
                </div>
                <div className='info--link'>
                    <div>
                    <p>{profile?.pseudo}</p>
                    <Link href={'#'}>
                        <a>Partager</a>
                    </Link>
                    </div>
                </div>
            </div>
        </div>


        

        <div className='profilChoiceBlock'>
            <div className={`profilChoice ${profilChoice == 'photo' ? 'active' : ''}`} onClick={() => setProfilChoice('photo')}>
            <div className='profil__icone' >
                    <Image
                        src={'/profil/album.webp'}
                        alt="icone"
                        width={20}
                        height={20}
                    />
                </div>
                Photos
            </div>
            <div className={`profilChoice ${profilChoice == 'agenda' ? 'active' : ''}`} onClick={() => setProfilChoice('agenda')}>
                <div className='profil__icone' >
                    <Image
                        src={'/profil/agenda.webp'}
                        alt="icone"
                        width={20}
                        height={20}
                    />
                </div>
                Agenda
            </div>
            <div className={`profilChoice ${profilChoice == 'sante' ? 'active' : ''}`} onClick={() => setProfilChoice('sante')}>
            <div className='profil__icone' >
                    <Image
                        src={'/profil/sante.webp'}
                        alt="icone"
                        width={20}
                        height={20}
                    />
                </div>
                Santé
            </div>
            <div className={`profilChoice ${profilChoice == 'sante' ? 'active' : ''}`} onClick={() => setProfilChoice('sante')}>
            <div className='profil__icone' >
                    <Image
                        src={'/profil/contact.webp'}
                        alt="icone"
                        width={20}
                        height={20}
                    />
                </div>
                Relation
            </div>
        </div>



        <div className='display__desktop'>
            {profilChoice == 'photo' && 
                <>
                    <div className='profil__grid--desktop'>
                        <p className='profil__grid--desktop-title'>Mes photos</p>
                        <div className='profil__grid--desktop-subtitle' >
                            <p>Voyage avec Titouan </p>
                            <p>
                                <Link href={'#'}>
                                    <a>Voir plus</a>
                                </Link>
                            </p>
                        </div>
                        <div className='profil__grid--desktop-album'>
                            <div className='album__card'>
                                <Image
                                    src={'/profil/album_profil.png'}
                                    alt="image pour illustrer le profil, paysage de montagne avec deux personnes"
                                    height={270}
                                    width={270} 
                                />
                                <div className='album__card--info'>
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
                            <div className='album__card'>
                                <Image
                                    src={'/profil/album_profil.png'}
                                    alt="image pour illustrer le profil, paysage de montagne avec deux personnes"
                                    height={270}
                                    width={270} 
                                />
                                <div className='album__card--info'>
                                <p>
                                    <Image
                                        src={"/profil/mark-position.webp"}
                                        alt="logo localisation"
                                        width={15}
                                        height={15}
                                    />
                                    Strasbourg<br></br>
                                    <span>17/02/22</span>
                                </p>
                                </div>
                            </div>
                            <div className='album__card'>
                                <Image
                                    src={'/profil/album_profil.png'}
                                    alt="image pour illustrer le profil, paysage de montagne avec deux personnes"
                                    height={270}
                                    width={270} 
                                />
                                <div className='album__card--info'>
                                <p>
                                    <Image
                                        src={"/profil/mark-position.webp"}
                                        alt="logo localisation"
                                        width={15}
                                        height={15}
                                    />
                                    Annecy<br></br>
                                    <span>20/01/22</span>
                                </p>
                                </div>
                            </div>
                            <div className='album__card'>
                                <Image
                                    src={'/profil/album_profil.png'}
                                    alt="image pour illustrer le profil, paysage de montagne avec deux personnes"
                                    height={270}
                                    width={270} 
                                />
                                <div className='album__card--info'>
                                <p>
                                    <Image
                                        src={"/profil/mark-position.webp"}
                                        alt="logo localisation"
                                        width={15}
                                        height={15}
                                    />
                                    Carcassonne<br></br>
                                    <span>12/01/22</span>
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {profilChoice == 'agenda' && 
           
                <>

                <DateRangePicker
                    ranges={[]}
                    minDate={new Date()}
                    rangeColors={["#F885CA"]}
                    onChange={handleSelect}
                    inputRanges={[]}
                    disabledDates={daysOfYear}
                />
                    <div className='experienceBlock'>
                        {profile?.experience.map((exp,i) =>(
                        <div key={i}>
                        {exp.start == exp.end ? (
                        <h3>Le {exp.end}</h3>
                        ) : (
                        <h3>Du {exp.start} au {exp.end}</h3>
                        )}
                        <p>Expérience avec {exp.grandParent?.firstName || exp.grandChildren?.firstName} à {exp.place}</p>
                        </div>
                        ))}
                    </div>
                </>
            }
            {profilChoice == 'sante' && 
                <>
                <div className='sante__container'>
                    <h2>Mes informations</h2>
                        
                    <p className='desktopInfosDescription'>Lors du questionnaire, nous avons récolté ces données sur vous : </p>

                    
                    <div className='infosQuestion'>
                        <h2 className='titleCenter'>Questions sur <br></br>les conditions générales</h2>
                        <div className='questionBlock'>
                            <p className='question'>Avez-vous des problèmes de santé*</p>
                            <div className='answer'>
                                <p className={`choice ${value.healthIssue == true && 'active'}`} onClick={() => setValue({...value, healthIssue: true})}>Oui</p>
                                <p className={`choice ${value.healthIssue == false && 'active'}`} onClick={() => setValue({...value, healthIssue: false})}>Non</p>
                            </div>
                        </div>

                        <div className='questionBlock'>
                            <p className='question'>Avez-vous des difficultés pour :</p>
                            <div className='answer'>
                                <p className={`choice ${value.mobility == true && 'active'}`} onClick={() => setValue({ ...value, mobility: !value.mobility})}>La mobilité</p>
                                <p className={`choice ${value.vision == true && 'active'}`} onClick={() => setValue({...value, vision: !value.vision})}>La vision</p>
                                <p className={`choice ${value.language == true && 'active'}`} onClick={() => setValue({...value, language: !value.language})}>Le langage</p>
                                <p className={`choice ${value.audition == true && 'active'}`} onClick={() => setValue({...value, audition: !value.audition})}>L&apos;audition</p>
                            </div>
                        </div>

                        <div className='questionBlock'>
                            <p className='question'>Êtes vous sportif ?*</p>
                            <div className='answer'>
                                <p className={`choice ${value.sportAddicted == true && 'active'}`} onClick={() => setValue({...value, sportAddicted: true})}>Oui</p>
                                <p className={`choice ${value.sportAddicted == false && 'active'}`} onClick={() => setValue({...value, sportAddicted: false})}>Non</p>
                            </div>
                        </div>

                        <div className='questionBlock'>
                            <p className='question'>Savez-vous nager ?*</p>
                            <div className='answer'>
                                <p className={`choice ${value.swim == true && 'active'}`} onClick={() => setValue({...value, swim: true})}>Oui</p>
                                <p className={`choice ${value.swim == false && 'active'}`} onClick={() => setValue({...value, swim: false})}>Non</p>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            }
            
        </div>
        <button className="deco" onClick={(e) => logout(e)}>Déconnexion</button>
    </ProfileStyle>
  </>)
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
            redirect:'/experience/',
            permanent:false
        }
    }
    
}