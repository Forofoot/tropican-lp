import React, { useState } from 'react'
import dynamic from 'next/dynamic'
//import { questions } from "./content/questions" // these are the survey question


const SurveyComponent = dynamic(() => import("../../../components/survey/SurveyQuizz"), {
    ssr: false,
  })

export default function Quizz() {
  return (
    <div><SurveyComponent /></div>
  )
}
