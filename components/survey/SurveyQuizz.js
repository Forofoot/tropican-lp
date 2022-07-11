import React, { useState } from 'react'
import * as Survey from "survey-react" // import surveyjs
import styled from 'styled-components';
import Image from 'next/dist/client/image';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import Moment from 'react-moment';
import 'moment/locale/fr';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import {useRouter} from 'next/router'
// Modern theme
import "survey-react/modern.min.css"

const daysOfYear = []

const SurverStyle = styled.section`
    position: relative;
    min-height: 95vh;
    h1{
        display: none;
        margin-bottom: 35px;
    }
    h2{
        margin-bottom: 15px;
    }
    .btnDefault{
        border: 1px solid #212F89;
        color: #212F89;
        margin: 20px auto 0 auto;
        display: block;
        font-weight: bold;
    }
    h2,
    p{
        color: #F20D97;
        font-size: 1.25rem;
        font-weight: bold;
    }
    p{
        color: #212F89;
        font-weight: 100;
    }
    .agendaSection{
        width: 100%;
    }
    .loadingGif{
        display: flex;
        justify-content: center;
    }
    .questionBlock{
        margin-bottom: 30px;
        .question{
            margin-bottom: 15px;
        }
    }
    .selectRelationLabel{
        margin-bottom: 30px;
    }
    .findRelation{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        gap: 20px;
        
        p{
            font-size: 1rem;
            color: #313131;
            border-bottom: 1px solid #F20D97;
            padding-bottom: 15px;
            width: 100%;
        }
        div{
            width: 32px;
            height: 32px;
            background-color: #F20D97;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            .arrow{
                border: solid #f4f4f4;
                border-width: 0 3px 3px 0;
                display: inline-block;
                padding: 3px;
                margin-bottom: 3px;
                will-change: transform;
                transform: rotate(45deg);
                transition: transform ease-out .2s;
                &.active{
                    transform: rotate(-135deg); 
                    margin-bottom: 0;
                    margin-top: 3px;
                }
            }
        }
        
    }
    .relationResult{ 
        border: 1px solid #F20D97;
        border-radius: 10px;
        max-width: 600px;
        display: none;
        margin-bottom: 30px;
        background-color: #fefefe;
        cursor: pointer;
        .relationBlockResult{
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .valid{
                visibility: hidden;
                will-change: opacity;
                opacity: 0;
                border-radius: unset;
                transition: opacity linear .5s;
            }
            &.active{
                .valid{
                    visibility: visible;
                    opacity: 1;
                }
            }
            img{
                border-radius: 50%;
            }
        }
        hr{
            border-color: #F20D97;
        }
        hr:last-of-type{
            display: none;
        }
        &.show{
            display: block;
        }
        
    }
    .recapContainer{
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 25px 30px;
        border: 1px solid #212F89;
        border-radius: 10px;
        max-width: 510px;
        margin: auto auto 40px auto;
        .recapBlock{
            display: flex;
            align-items: center;
            gap: 15px;
            img{
                max-width: 50px;
                max-height:50px ;
            }
            h3,
            p{
                font-size: 1rem;
                color: #000;
            }
            h3{
                font-weight: bold;
            }
        }
    }
    .sv-action-bar{
        display:flex;
        align-items: center;
        justify-content: center;
        margin-top:10px;
        padding: 0;
        position: unset;
        overflow: auto;

        .sv-btn{
            background-color: #212F89!important;
            padding: 15px 0;
            text-align: center;
            width: 180px;
            font-size: inherit;
            border-radius: 50px;
            margin: auto;
        }
    }

    .sv-footer__prev-btn{
        display: none;
    }

    .back{
        all: unset;
        position: absolute;
        top: 0;
        left: 0;
        width: 35px;
        height: 35px;
        background-image: url('/quizz/arrow-left.webp');
        background-repeat: no-repeat;
        cursor: pointer;
    }
    .sv-question__title{
        color: #212F89;
        font-size: 1.25rem;
        .sv-question__num{
            color:#F20D97;
            font-weight: bold;
        }
    }
    .sv-imagepicker{
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        align-items: center;
        justify-content: center;
    }

    .sv-progress__text{
        display: none;
    }
    .sv-progress{
        height: 5px;
        background-color: rgba(242, 13, 151, 0.2)!important;
        .sv-progress__bar{
        background-color: #F20D97!important;
        border-radius: 0px 2.5px 2.5px 0px;
        }
    }
    .sv-imagepicker__item{
        margin-right: 0;
    }
    .sv-imagepicker__item--checked{
        position: relative;
        &::before{
            content: '';
            background-image: url('/tools/valid.webp');
            background-size: 70px;
            background-position: center;
            background-color: rgba(33,47,137, 0.75);
            background-repeat: no-repeat;
            position: absolute;
            height: 165px;
            width: 165px;
        }
    }

    .sv-imagepicker__image{
        width: 165px;
        height: 165px;
        object-fit: cover!important;
        border-radius: 10px;
        margin-bottom: 15px;
    }
    .sv-imagepicker__text{
        font-weight: bold;
    }

    .titleCenter{
        text-align: center;
    }
    .dateRangeContainer{
        width: 100%;
        text-align: center;
        margin-bottom: 45px;
        margin-top: 15px;
        .rdrDateRangePickerWrapper,
        .rdrCalendarWrapper,
        .rdrMonth{
            width: 100%!important;
        }
    }
    .rdrWeekDays,.rdrDays{
    width: 95%;
    }
    .rdrMonthAndYearWrapper {
    width: 91%; 
    }
    .rdrCalendarWrapper.rdrDateRangeWrapper {
    width: 100%;
    }
    .rdrDefinedRangesWrapper {
    width: 100%;
    }
    .rdrDateRangePickerWrapper, .rdrMonth {
        width: 100%;
}

}
    .infosQuestion{
        max-width:510px;
        margin: auto;
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
    
    .rdrDefinedRangesWrapper{
        display: none;
    }
    .btnPrimary{
        display: block;
        margin: auto;
    }
    .rdrNextPrevButton{
        background: #212F89;
    }
    .rdrNextButton{
        i{
            border-color: transparent transparent transparent #f4f4f4;
        }
    }
    .rdrPprevButton{
        i{
            border-color: transparent #f4f4f4 transparent transparent;
        }
    }
    
    .rdrCalendarWrapper{
        display: flex;
        flex-direction: column;
        background: none;
        width: 100%;
        .rdrDateDisplayWrapper{
            order: 3;
            margin-top: 20px;
            background: none;
            max-width: 350px;
            .rdrDateDisplay{
                margin: 0;
                border: 1px solid #F20D97;
                border-radius: 10px;
                padding: 15px 20px;
                .rdrDateDisplayItem{
                    background:none;
                    border: none;
                    box-shadow: none;
                    position: relative;
                    input{
                        color: #F20D97;
                    }
                    &:first-child{
                        &::after{
                            content: '';
                            right: 0;
                            top:0;
                            height: 30px;
                            width: 2px;
                            background-color: #F20D97;
                            position: absolute;
                        }
                    }
                }
            }
        }
        .rdrMonthAndYearWrapper,
        .rdrMonths{
            background-color: #ffffff;
            width: 100%!important;
        }
    }
    .desktopInfosDescription{
        display: none;
    }

    .notFoundInfos{
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 650px;
        margin: auto;
        align-items: center;
        background-color: rgba(131, 215, 220, 0.4);
        padding: 55px 80px;
        border-radius: 20px ;
        h2{
            font-size: 1em;
            font-weight: bold;
            color: #212F89;
            font-size: 1.25em;
            text-transform: uppercase;
        }
        p{
            margin-bottom: 40px;
            text-align: center;
        }
    }
    .gotoHome{
        text-align: center;
        margin-top: 25px;
        text-decoration: underline;
        a{
            margin: auto;
            color: #313131;
        }
    }

    @media (min-width: 1024px){
        padding: 0 140px;
        h1{
            display: block;
            text-align: center;
        }
        h5{
            text-align: center;
            .sv-question__num{
                font-size: 1.875em;
            }
        }
        .recapSection{
            h2{
                text-align: center;
                font-size: 1.875em;
                margin-bottom: 40px;
            }
        }
        .agendaSection{
            display: flex;
            background-color: rgba(131, 215, 220, 0.4);
            padding: 55px 80px;
            border-radius: 20px ;
            gap: 15px;
            h2{
                font-size: 1.875em;
            }
            .dateSection{
                order: 1;
                width: 70%;
                .dateRangeContainer{
                    text-align: left;
                }
            }
            .relationSection{
                order: 2;
                width: 30%;
            }
        }
        .infosQuestion{
            background-color:rgba(131, 215, 220, 0.4);
            padding: 55px 80px;
            border-radius: 20px;
            h2{
                display: none;
            }
        }
        
        .desktopInfosDescription{
            display: block;
            text-align:center;
            color: #313131;
            margin-bottom: 40px;
        }
        .back{
            left: 135px;
        }
        .sv-progress{
            position: absolute;
            bottom: 55px;
            left: 50%;
            width: 415px;
            transform: translateX(-50%);
        }
        .sv-imagepicker__image{
            width: 215px;
            height: 215px;
        }
        .sv-imagepicker__item--checked{
            &::before{
                width: 215px;
                height: 215px;
                background-size: 110px;
            }
        }
    } 

`

export default function SurveryQuizz({user, relation}) {
    const questions = {
        showProgressBar: "top",
        startSurveyText: "Valider",
        pages: [
        {
            "elements": [
            {
                "type": "imagepicker",
                "name": "place",
                "title": "Quel type de lieu préférez-vous ?",
                "isRequired": true,
                "choices": [
                {
                    "value": "Metropole",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140957/quizz/Metropole_e7hzm7.webp",
                    "commentText":"test"
                },
                {
                    "value": "Ville",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140953/quizz/Ville_avlgiq.webp"
                },
                {
                    "value": "Village",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140953/quizz/Village_o7j8ve.webp"
                },
                {
                    "value": "Nature",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140952/quizz/nature_hmjdn7.webp"
                }
                ]
            }
            ]
        },
        
        {
            "elements": [
            {
                "type": "imagepicker",
                "name": "accomodation",
                "title": "Quel type de logement préférez-vous ?",
                "isRequired": true,
                "choices": [
                {
                    "value": "Guesthouse",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140952/quizz/Maison_d_h%C3%B4te_azmpqm.webp"
                },
                {
                    "value": "Hotel",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140950/quizz/H%C3%B4tel_qwldh0.webp"
                },
                {
                    "value": "Camping",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140950/quizz/Camping_1_llgqyd.webp"
                },
                {
                    "value": "Atypique",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140949/quizz/Atypique_g2kxot.webp"
                }
                ]
            }
            ]
        }, 
        
        
        {
            "elements": [
            {
                "type": "imagepicker",
                "name": "mainTheme",
                "title": "Quel type de loisir préférez-vous",
                "isRequired": true,
                "choices": [
                {
                    "value": "Detente",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140950/quizz/d%C3%A9tente_r8zbqs.webp"
                },
                {
                    "value": "Sport",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140957/quizz/sportif_vqpacb.webp"
                },
                {
                    "value": "Culturel",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140949/quizz/Culturel_wzkm6q.webp"
                },
                {
                    "value": "Jeux",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140950/quizz/Jeux_i6wipx.webp"
                }
                ]
            }
            ]
        }, {
            "elements": [
            {
                "type": "imagepicker",
                "name": "secondThemeSport",
                "title": "Quel type de sport préférez-vous ?",
                "visibleIf": "{mainTheme}='Sport'",
                "choicesOrder": "random",
                "isRequired": true,
                "choices": [
                {
                    "value": "Extreme",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140950/quizz/Extr%C3%AAme_1_jife9n.webp"
                },
                {
                    "value": "Equipe",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140949/quizz/%C3%89quipe_1_dpnunh.webp"
                },
                {
                    "value": "Vehicule",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140953/quizz/V%C3%A9hicul%C3%A9_kdexsp.webp"
                },
                {
                    "value": "Aquatique",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140954/quizz/Aquatique_ojraeq.webp"
                }
                ]
            }
            ]
        }, {
            "elements": [
            {
                "type": "imagepicker",
                "name": "secondThemeCulturel",
                "title": "Quel domaine culturel préférez-vous ?",
                "visibleIf": "{mainTheme}='Culturel'",
                "choicesOrder": "random",
                "choices": [
                {
                    "value": "Art",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140953/quizz/Art_mrbtr8.webp"
                },
                {
                    "value": "Histoire",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140950/quizz/Histoire_jkuept.webp"
                },
                {
                    "value": "Musique",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140951/quizz/Musique_py58y6.webp"
                },
                {
                    "value": "Spectacle",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140952/quizz/Spectacle_gxcjfy.webp"
                }
                ],
            }
            ]
        }, {
            "elements": [
            {
                "type": "imagepicker",
                "name": "secondThemeDetente",
                "title": "Comment voulez-vous vous détendre ?",
                "visibleIf": "{mainTheme}='Detente'",
                "choicesOrder": "random",
                "choices": [
                {
                    "value": "Soin",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140951/quizz/Soins_wly9ts.webp"
                },
                {
                    "value": "Spirituelle",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140952/quizz/Spirituelle_edquac.webp"
                }
                ],
            }
            ]
        }, {
            "elements": [
            {
                "type": "imagepicker",
                "name": "secondThemeJeux",
                "title": "Quel type de jeux préférez-vous",
                "visibleIf": "{mainTheme}='Jeux'",
                "choicesOrder": "random",
                "choices": [
                {
                    "value": "Strategie",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140951/quizz/Strat%C3%A9gie_1_im42nr.webp"
                },
                {
                    "value": "Societe",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140950/quizz/Jeux_de_soci%C3%A9t%C3%A9_mmljnp.webp"
                },
                {
                    "value": "Interaction",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140950/quizz/Interaction_motkgq.webp"
                },
                {
                    "value": "Immersif",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140952/quizz/Strat%C3%A9gie_fzqhgb.webp"
                }
                ],
            }
            ]
        }, {
            "elements": [
            {
                "type": "imagepicker",
                "name": "thirdTheme",
                "title": "Quel genre de prestation souhaitez-vous ?",
                "choicesOrder": "random",
                "choices": [
                {
                    "value": "Luxueuse",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140951/quizz/Luxe_ckeckw.webp"
                },
                {
                    "value": "Confortable",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140949/quizz/Confortable_1_akv1uh.webp"
                },
                {
                    "value": "Abordable",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140953/quizz/Abordable_ssfzfu.webp"
                },
                {
                    "value": "Standard",
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140952/quizz/Standard_m0pbbq.webp"
                }
                ],
            }
            ]
        }
        ]
    
    };
    const router = useRouter()
    Survey.StylesManager.applyTheme("modern")
    // Create a modal
    const survey = new Survey.Model(questions)
    const [currentPage, setCurrentPage] = useState('agenda')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }
    const [value, setValue] = useState({
        start: new Date(),
        end: new Date(),
        pseudo: "",
        relationId: "",
        healthIssue: relation.healthissue,
        sportAddicted: relation.sportaddict,
        swim: relation.swim,
        mobility: relation.mobility,
        vision: relation.vision,
        language: relation.language,
        audition: relation.audition
    });
    const [state, setstate] = useState([])
    const [datas, setDatas] = useState()
    const [view, setView] = useState(false)
    let q = survey.getAllQuestions();
    q.forEach(elt =>{
        elt.showLabel = 'aaa';
    })
    survey.pageNextText = 'Suivant'
    survey.pagePrevText = 'a'

    const handleSelect = ( ranges ) =>{
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
        setValue({...value,
            start:ranges.selection.startDate,
            end:ranges.selection.endDate
        })
    }

    relation.experience.forEach(pro => {
        for (let d = pro.start; d <= pro.end; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(new Date(d));
        }
    });
    survey.onComplete.add(function (survey, options) {
        setCurrentPage('loading')
        setstate([
            survey.data.place,
            survey.data.accomodation,
            survey.data.mainTheme, 
            survey.data.secondThemeSport || survey.data.secondThemeCulturel || survey.data.secondThemeDetente || survey.data.secondThemeJeux, 
            survey.data.thirdTheme
        ])
        const fetchData = async () => {
            const response = await fetch(`/api/quizz/getData`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                areas: survey.data.place,
                accomodation: survey.data.accomodation,
                healthIssue: value.healthIssue,
                currentUserPseudo: relation.pseudo,
                vision: value.vision,
                mobility: value.mobility,
                language: value.language,
                audition: value.audition,
                sportaddict: value.sportAddicted,
                swim: value.swim,
                mainTheme: survey.data.mainTheme,
                secondTheme: survey.data.secondThemeTrip || survey.data.secondThemeSport || survey.data.secondThemeCulturel,
                thirdTheme: survey.data.thirdTheme
              }),
            });
            const json = await response.json()
            if(response.ok){
                setDatas(json)
                setCurrentPage('recap')
            }else{
                setCurrentPage('notFound')
            }
        }
        fetchData()
    });

    const handleChoose = ( choose ) =>{
        if(!value.pseudo){
            toast.error('Choisir un pseudo et une date')
        }else{
            setCurrentPage(choose)
        }
    }

    const handleSelectRelation = (pseudo, relationIdentity) =>{
        setValue({ ...value, 
            pseudo:pseudo,
            relationId:relationIdentity
        })
    }
    //survey.showPreviewBeforeComplete = 'showAnsweredQuestions';
    const handleCreateExperience = async (key) =>{
        const response = await fetch(`/api/quizz/createExperience`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              name: datas.name,
              place: datas.place,
              start: value.start,
              end: value.end,
              long: datas.long,
              lat: datas.lat,
              currentUserPseudo: relation.pseudo,
              relationPseudo: value.pseudo,
              relationId: value.relationId
            }),
        });
        if(response.ok){
            toast.success('Expérience créée')
            router.push(`/experience/map/${relation.pseudo}`)
        }
    }
  return (
    <SurverStyle>
        <Toaster />
        {currentPage == 'agenda' &&
            <>
                <h1>Durée de votre magnifique expérience</h1>
                <div className='agendaSection'>
                    <div className='relationSection'>
                        <h2>Avec qui ?</h2>
                        <p className='selectRelationLabel'>Sélection de la relation :</p>
                        <div className='findRelation'>
                            <p>Cherchez votre relation</p> 
                            <div onClick={() => setView(!view)}>
                                <span className={`arrow ${view == true ? ('active') : ('')}`}></span>
                            </div>
                        </div>
                        <div className={`relationResult ${view == true ? ('show') : ('')}`}>
                            {relation.relation.map((elt, i)=>(
                                <>
                                <div key={i} onClick={() => handleSelectRelation(`${elt.grandparent?.pseudo || elt.grandChildren?.pseudo}`, `${elt.grandparent?.id || elt.grandChildren?.id}`)}  className={`relationBlockResult ${value.pseudo == elt.grandparent?.pseudo || value.pseudo == elt.grandChildren?.pseudo ? ('active') : ('')}`}>
                                    <p>
                                        {elt.grandChildren?.avatar || elt.grandparent?.avatar ? (
                                            <Image
                                                src={`${elt.grandChildren?.avatar || elt.grandparent?.avatar}`}
                                                alt={`Avatar de ${elt.grandChildren?.pseudo || elt.grandparent?.pseudo}`}
                                                width={39}
                                                height={39}
                                                objectFit='cover'
                                            />
                                            ) : (
                                            <Image
                                                src={`/logo.webp`}
                                                alt={`Avatar de ${elt.grandChildren?.pseudo || elt.grandparent?.pseudo}`}
                                                width={39}
                                                height={39}
                                                objectFit='cover'
                                            />)
                                        }
                                        {elt.grandparent?.pseudo || elt.grandChildren?.pseudo}
                                    </p>
                                    <Image
                                        src={'/tools/valider.webp'}
                                        alt={'Icon valider'}
                                        width={28}
                                        height={28}
                                        className='valid'
                                    />
                                </div>
                                <hr></hr>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='dateSection'>
                        <h2>Quand ?</h2>
                        <p>Date de l&apos;expérience :</p>
                        <div className='dateRangeContainer'>
                            <DateRangePicker
                                ranges={[selectionRange]}
                                minDate={new Date()}
                                rangeColors={["#F885CA"]}
                                onChange={handleSelect}
                                inputRanges={[]}
                                disabledDates={daysOfYear}
                            />
                        </div>
                        <button className='btnPrimary' onClick={() => handleChoose('infos')}>
                            Valider
                        </button>
                    </div>
                    
                </div>
            </>
        }
        {currentPage == 'infos' &&
            <>
                <h1>Question sur les conditions générales</h1>
                <p className='desktopInfosDescription'>Les questions ne vous seront plus posées une fois que vous aurez validé les réponses.<br></br> Vous pourrez toujours modifier vos réponses si elles changent dans la parties profil.</p>
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

                    <button className='back' onClick={() => handleChoose('agenda')}></button>
                    <button className='btnPrimary' onClick={() => handleChoose('quizz')}>
                        Valider
                    </button>
                </div>
            </>
        }

        {currentPage == 'quizz' && 
            <>
                <a id="surveyPrev" href="#" className='back quizz sv-btn--navigation' 
                onClick={() => survey.prevPage()}></a>
                <Survey.Survey model={survey} />
                <p className='gotoHome'>
                    <Link href='/experience/' title="Retour à l'accueil">
                        <a>
                            Retour à l&apos;accueil
                        </a>
                    </Link>
                </p>
            </>
        }
    
        {currentPage == 'recap' &&
            <div className='recapSection'>
                <h2>Résultat de vos brillantes réponses</h2>
                <div className='recapContainer'>
                    <div className='recapBlock'>
                        <Image
                            src={'/quizz/recap/date.webp'}
                            alt='icon calendrier'
                            width={50}
                            height={50}
                            layout='raw'
                        />
                        <div>
                            <h3>Date</h3>
                            <p><Moment locale="fr" date={value.start} format="ll" /> - <Moment locale="fr" date={value.end} format="ll" /></p>
                        </div>
                     </div>
                     <div className='recapBlock'>
                        <Image
                            src={'/quizz/recap/location.webp'}
                            alt='Icon localisation'
                            width={50}
                            height={50}
                            layout='raw'
                        />
                        <div>
                            <h3>Lieu</h3>
                            <p>{datas?.place}</p>
                        </div>
                     </div>
                     <div className='recapBlock'>
                        <Image
                            src={'/quizz/recap/office.webp'}
                            alt='Icon batiment bureau'
                            width={50}
                            height={50}
                            layout='raw'
                        />
                        <div>
                            <h3>Logement</h3>
                            <p>{state[1]}</p>
                        </div>
                     </div>
                     <div className='recapBlock'>
                        <Image
                            src={'/quizz/recap/bowling.webp'}
                            alt='Icon Bowling'
                            width={50}
                            height={50}
                            layout='raw'
                        />
                        <div>
                            <h3>Loisir</h3>
                            <p>{state[2]} - {state[3]}</p>
                        </div>
                     </div>
                     <div className='recapBlock'>
                        <Image
                            src={'/quizz/recap/notepencil.webp'}
                            alt='Icon bloc note'
                            width={50}
                            height={50}
                            layout='raw'
                        />
                        <div>
                            <h3>Prestation</h3>
                            <p>{state[4]}</p>
                        </div>
                     </div>
                </div>
                <button className='btnPrimary' onClick={() => handleCreateExperience()}>Valider</button>
                <button className='btnDefault' onClick={() => handleChoose('agenda')}>Annuler</button>
            </div>
        }
        

        {currentPage == 'notFound' &&
            <>
                <div className='notFoundInfos'>
                    <h2>Oh non !</h2>
                    <p>
                        Nous ne trouvons aucune expérience en fonction de vos choix...
                    </p>
                    <Image
                        src={'/quizz/error.webp'}
                        alt='Aucune expérience trouvée'
                        width={68}
                        height={164}
                    />
                </div>
                <p className='gotoHome'>
                    <Link href='/experience/' title="Retour à l'accueil">
                        <a>
                            Retour à l&apos;accueil
                        </a>
                    </Link>
                </p>
            </>
        }              
        {currentPage == 'loading' &&
        <div className='loadingGif'>
            <Image
                src={'/tools/loading.gif'}
                alt='Chargement...'
                width={300}
                height={300}
            />
        
        </div>
        }
    </SurverStyle>
  )
}