import React, { useState } from 'react'
import dynamic from 'next/dynamic'
//import { questions } from "./content/questions" // these are the survey question
import { parseCookies } from "../../../helpers/"
import { PrismaClient } from '@prisma/client'
import styled from 'styled-components'

const SurveyComponent = dynamic(() => import("../../../components/survey/SurveyQuizz"), {
    ssr: false,
  })

const QuizzStyle = styled.section`
  min-height: 95vh;
`

export default function Quizz({user, relation}) {
  return (
    <QuizzStyle className='container'>
      <SurveyComponent user={user} relation={relation}/>
    </QuizzStyle>
  )
}



export const getServerSideProps = async ({ req, res }) => {
  const cookie = parseCookies(req)

  if (res) {
    if(cookie.user){
      const parsedUser =  JSON.parse(cookie.user)
      const prisma = new PrismaClient()
      if(parsedUser.role == 'grandchildren'){
        const relation = await prisma.grandchildren.findUnique({
          where:{
            pseudo: parsedUser.pseudo
          },
          select:{
            pseudo:true,
            experience:{
              select:{
                start:true,
                end:true
              }
            },
            relation:{
              select:{
                grandparent:{
                  select:{
                    id:true,
                    pseudo:true,
                    avatar:true
                  }
                }
              }
            },
            vision:true,
            mobility:true,
            language:true,
            audition:true,
            healthissue:true,
            sportaddict:true,
            swim:true,
          }
        })
        await prisma.$disconnect()
        return{
          props:{
            relation,
            user: parsedUser && parsedUser,
          }
        }
      }

      if(parsedUser.role == 'grandparent'){
        const relation = await prisma.grandparent.findUnique({
          where:{
            pseudo: parsedUser.pseudo
          },
          select:{
            pseudo:true,
            experience:{
              select:{
                start:true,
                end:true
              }
            },
            relation:{
              select:{
                grandChildren:{
                  select:{
                    id:true,
                    pseudo:true,
                    avatar:true
                  }
                }
              }
            },
            vision:true,
            mobility:true,
            language:true,
            audition:true,
            healthissue:true,
            sportaddict:true,
            swim:true,
          }
        })
        await prisma.$disconnect()
        return{
          props:{
            relation,
            user: parsedUser && parsedUser,
          }
        }
      }
    }
  }
}