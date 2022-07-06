import React, { useState, useEffect } from 'react'
import * as Survey from "survey-react" // import surveyjs
import { questions } from "./content/questions" // these are the survey question

// Modern theme
import "survey-react/modern.min.css"

export default function Quizz() {
    
    Survey.StylesManager.applyTheme("modern")
    // Create a modal
    const survey = new Survey.Model(questions)

        
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
            survey.data.thirdTheme])
      });

      console.log(state)
      survey.showPreviewBeforeComplete = 'showAnsweredQuestions';
  return (
    <div><Survey.Survey model={survey} /></div>
  )
}
