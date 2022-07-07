import React, { useState, useEffect } from 'react'
import * as Survey from "survey-react" // import surveyjs
//import { questions } from "./content/questions" // these are the survey question

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

// Modern theme
import "survey-react/modern.min.css"

const daysOfYear = []

export default function SurveryQuizz({user, relation}) {
    const questions = {
        showProgressBar: "top",
        firstPageIsStarted: true,
        startSurveyText: "Valider",
        pages: [
        {
            "elements": [
            {
                "type": "html",
                "html": ""
            }
            ]
        },
        {
            "elements": [
            {
                "type": "boolean",
                "name": "Sante",
                "label": "Avez-vous des problèmes de santé ?",
                "isRequired": true
            },
            {
                "type": "checkbox",
                "name": "Physique",
                "title": "Avez vous des difficultés ?",
                "colCount": 1,
                "choices": [
                "La mobilité",
                "La vision",
                "L'audition",
                "Le langage",
                ]
            },
            {
                "type": "boolean",
                "name": "Areyousportaddict",
                "label": "Êtes-vous sportif ?",
                "isRequired": true
            },
            {
                "type": "boolean",
                "name": "Swim",
                "label": "Savez-vous nager ?",
                "isRequired": true
            },
            {
                "name": "date",
                "type": "datepicker",
                "inputType": "date",
                "title": "Your favorite date:",
                "dateFormat": "mm/dd/yy",
                "isRequired": true
            }
            ]
        },
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
                    "imageLink":"https://res.cloudinary.com/leste/image/upload/v1657140957/quizz/Metropole_e7hzm7.webp"
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
    
    const handleSelect = ( ranges ) =>{
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
        setValue({
            start:ranges.selection.startDate,
            end:ranges.selection.endDate
        })
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    
    const [value, setValue] = useState({
        start: new Date(),
        end: new Date(),
        pseudo: ""
    });
    relation.experience.forEach(pro => {
        for (let d = pro.start; d <= pro.end; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(new Date(d));
        }
    });
    const [state, setstate] = useState([])
    const [datas, setDatas] = useState([])
    survey.onComplete.add(function (survey, options) {
        setstate([
            survey.data.Areyousportaddict,
            survey.data.Sante,
            survey.data.Physique,
            survey.data.Swim,
            survey.data.place,
            survey.data.accomodation,
            survey.data.mainTheme, 
            survey.data.secondThemeSport || survey.data.secondThemeCulturel || survey.data.secondThemeDetente || survey.data.secondThemeJeux, 
            survey.data.thirdTheme
        

            ])
    });

    const handleChoose = ( choose ) =>{
        console.log(value)
        if(!value.pseudo || !value.start || !value.end){
            alert('Choisir une relation et une date')
        }else{
            setCurrentPage(choose)
        }
    }

    const handleSelectRelation = (pseudo) =>{
        setValue({ ...value, pseudo:pseudo})
    }
    survey.showPreviewBeforeComplete = 'showAnsweredQuestions';

    useEffect(() =>{
    })
  return (
    <div>
        Agenda
        {currentPage == 'agenda' &&
            <>
                Sélectionner un contact: 
                    {relation.relation.map((elt, i)=>(
                        <p key={i} onClick={() => handleSelectRelation(`${elt.grandparent.pseudo}`)}>
                            {elt.grandparent.pseudo}
                        </p>
                    ))}
                <DateRangePicker
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={["#F885CA"]}
                    onChange={handleSelect}
                    inputRanges={[]}
                    disabledDates={daysOfYear}
                />
                <button onClick={() => handleChoose('infos')}>
                    Valider
                </button>
            </>
        }
        {currentPage == 'infos' &&
            <>
                <h3>Avez-vous des difficultés pour :</h3>
                <p>La mobilité</p>
                <p>La vision</p>
                <p>L'audition</p>
                <p>Le langage</p>
                <Survey.Survey model={survey} />
                <button onClick={() => handleChoose('agenda')}>
                    Retour
                </button>
            </>
        }
    </div>
  )
}