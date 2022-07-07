import React, { useState } from 'react'
import dynamic from 'next/dynamic'
//import { questions } from "./content/questions" // these are the survey question
import { parseCookies } from "../../../helpers/"
import { PrismaClient } from '@prisma/client'

const SurveyComponent = dynamic(() => import("../../../components/survey/SurveyQuizz"), {
    ssr: false,
  })

export default function Quizz({user, relation}) {
  return (
    <div><SurveyComponent user={user} relation={relation}/></div>
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
                    pseudo:true
                  }
                }
              }
            }
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
        const relation = await prisma.grandparent.findMany({
          where:{
            pseudo: parsedUser.id
          },
          select:{
            experience:{
              select:{
                start:true,
                end:true
              }
            },
            relation:{
              select:{
                grandchildren:{
                  select:{
                    pseudo:true
                  }
                }
              }
            }
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