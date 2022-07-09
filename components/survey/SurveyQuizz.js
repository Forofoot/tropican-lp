import React, { useState, useEffect } from 'react'
import * as Survey from "survey-react" // import surveyjs
import styled from 'styled-components';
//import { questions } from "./content/questions" // these are the survey question
import Image from 'next/dist/client/image';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import Moment from 'react-moment';
import 'moment/locale/fr';

// Modern theme
import "survey-react/modern.min.css"

const daysOfYear = []

const SurverStyle = styled.section`
    position: relative;
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
        padding: 20px;
        max-width: 600px;
        display: none;
        margin-bottom: 30px;
        cursor: pointer;
        div{
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
        margin-bottom: 40px;
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
        position: absolute;
        top: 0;
        width: 35px;
        height: 35px;
        background-image: url('/quizz/arrow-left.webp');
        background-repeat: no-repeat;
        &.quizz{
            top: 45px;
        }
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
        opacity: .5;
        margin-right: 0;
    }
    .sv-imagepicker__item--checked{
        opacity: 1;
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
        .rdrDateRangePickerWrapper,
        .rdrCalendarWrapper,
        .rdrMonth{
            width: 100%;
            max-width: 650px;
        }
    }
    .choice{
        padding: 10px 0 ;
        width: 100%;
        border: 1px solid #212F89;
        border-radius: 10px;
        text-align: center;
        display: inline-block;
        margin-bottom: 15px;
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
    .rdrDefinedRangesWrapper{
        display: none;
    }
    .btnPrimary{
        display: block;
        margin: auto;
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
    const [datas, setDatas] = useState([])
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
            setDatas(json)
        }
        fetchData()
        setCurrentPage('recap')
    });

    const handleChoose = ( choose ) =>{
        if(!value.pseudo){
            alert('Choisir une relation et une date')
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
              name: datas[key].name,
              place: datas[key].place,
              start: value.start,
              end: value.end,
              long: datas[key].long,
              lat: datas[key].lat,
              currentUserPseudo: relation.pseudo,
              relationPseudo: value.pseudo,
              relationId: value.relationId
            }),
        });
    }
  return (
    <SurverStyle>
        {currentPage == 'agenda' &&
            <>
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
                        <div onClick={() => handleSelectRelation(`${elt.grandparent?.pseudo || elt.grandChildren?.pseudo}`, `${elt.grandparent?.id || elt.grandChildren?.id}`)} key={i} className={`${value.pseudo == elt.grandparent?.pseudo || elt.grandChildren?.pseudo ? ('active') : ('')}`}>
                            <p>
                                <Image
                                    src={`${elt.grandChildren?.avatar || elt.grandparent?.avatar}`}
                                    alt={`Avatar de ${elt.grandChildren?.pseudo || elt.grandparent?.pseudo}`}
                                    width={39}
                                    height={39}
                                    objectFit='cover'
                                />
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
                    ))}
                </div>
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
            </>
        }
        {currentPage == 'infos' &&
            <>
                <h2 className='titleCenter'>Questions sur <br></br>les conditions générales</h2>
                <div className='questionBlock'>
                    <p className='question'>Avez-vous des problèmes de santé*</p>
                    <p className={`choice ${value.healthIssue == true && 'active'}`} onClick={() => setValue({...value, healthIssue: true})}>Oui</p>
                    <p className={`choice ${value.healthIssue == false && 'active'}`} onClick={() => setValue({...value, healthIssue: false})}>Non</p>
                </div>

                <div className='questionBlock'>
                    <p className='question'>Avez-vous des difficultés pour :</p>
                    <p className={`choice ${value.mobility == true && 'active'}`} onClick={() => setValue({ ...value, mobility: !value.mobility})}>La mobilité</p>
                    <p className={`choice ${value.vision == true && 'active'}`} onClick={() => setValue({...value, vision: !value.vision})}>La vision</p>
                    <p className={`choice ${value.language == true && 'active'}`} onClick={() => setValue({...value, language: !value.language})}>Le langage</p>
                    <p className={`choice ${value.audition == true && 'active'}`} onClick={() => setValue({...value, audition: !value.audition})}>L&apos;audition</p>
                </div>

                <div className='questionBlock'>
                    <p className='question'>Êtes vous sportif ?*</p>
                    <p className={`choice ${value.sportAddicted == true && 'active'}`} onClick={() => setValue({...value, sportAddicted: true})}>Oui</p>
                    <p className={`choice ${value.sportAddicted == false && 'active'}`} onClick={() => setValue({...value, sportAddicted: false})}>Non</p>
                </div>

                <div className='questionBlock'>
                    <p className='question'>Savez-vous nager ?*</p>
                    <p className={`choice ${value.swim == true && 'active'}`} onClick={() => setValue({...value, swim: true})}>Oui</p>
                    <p className={`choice ${value.swim == false && 'active'}`} onClick={() => setValue({...value, swim: false})}>Non</p>
                </div>

                <button className='back' onClick={() => handleChoose('agenda')}></button>
                <button className='btnPrimary' onClick={() => handleChoose('quizz')}>
                    Valider
                </button>
            </>
        }

        {currentPage == 'quizz' && 
            <>
                <a id="surveyPrev" href="#" className='back quizz' onClick={() => survey.prevPage()}></a>
                <Survey.Survey model={survey} />
            </>
        }
    
        {currentPage == 'recap' &&
            <>
                <h2>Résultat de vos brillantes réponses</h2>
                <div className='recapContainer'>
                    <div className='recapBlock'>
                        <Image
                            src={'/quizz/recap/date.webp'}
                            alt='Image'
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
                            alt='Image'
                            width={50}
                            height={50}
                            layout='raw'
                        />
                        <div>
                            <h3>Lieu</h3>
                            <p>{state[0]}</p>
                        </div>
                     </div>
                     <div className='recapBlock'>
                        <Image
                            src={'/quizz/recap/office.webp'}
                            alt='Image'
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
                            alt='Image'
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
                            alt='Image'
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
                <button className='btnPrimary' onClick={() => handleChoose('result')}>Valider</button>
                <button className='btnDefault' onClick={() => handleChoose('agenda')}>Annuler</button>
            </>
        }

        {currentPage == 'result' && 
            <>
                {datas.length ? (
                datas.map((data,i) =>(
                    <div key={i}>
                        <div>{data.place} <button onClick={() => handleCreateExperience(i)}>Choisir</button></div>
                    </div>
                ))) : (<>Aucune donnée</>) }
                
                
            </>
        }
    </SurverStyle>
  )
}