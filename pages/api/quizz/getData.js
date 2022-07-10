// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req,
  res
) {
  try{
  let currentExperience = []
  const {areas, accomodation, healthIssue, vision, mobility, language, audition, sportaddict, swim, mainTheme, secondTheme, thirdTheme, currentUserPseudo} = req.body

  const currentChildren = await prisma.grandchildren.findUnique({
    where:{
      pseudo: currentUserPseudo
    }
  })

  const currentParent = await prisma.grandparent.findUnique({
    where:{
      pseudo:currentUserPseudo
    }
  })
  if(currentChildren){
    const mycurrentActivity = await prisma.experience.findMany({
      where:{
        grandChildren:{
          is:{
            pseudo:currentUserPseudo
          }
        }
      }
    })
    const filteredActivity = await prisma.activity.findMany({
      where:{
          areas,
          accomodation,
          healthissue: healthIssue,
          vision,
          mobility,
          language,
          audition,
          sportaddict,
          swim,
          theme:{
              some:{
                  mainTheme,
                  secondTheme,
                  thirdTheme 
              }
          }
      }
    })
    filteredActivity.forEach(element => {
      mycurrentActivity.forEach(elt => {
        if(elt.name.includes(element.name) !== true){
          currentExperience.push(element.id)
        }
      })
    })
    if(currentExperience.length){
      const getData = await prisma.activity.findFirst({
        where:{
          id: currentExperience[Math.floor(Math.random() * currentExperience.length)]
        }
      })
      const updateUser = await prisma.grandchildren.update({
        where:{
          pseudo: currentUserPseudo
        },
        data:{
          healthissue: healthIssue,
          sportaddict,
          swim,
          vision,
          mobility,
          language,
          audition
        }
      })
      prisma.$disconnect()
      res.status(200).json(getData)
    }else{
      prisma.$disconnect()
      res.status(500).json('Aucune expérience trouvée')
    }
  }

  if(currentParent){
    const mycurrentActivity = await prisma.experience.findMany({
      where:{
        grandChildren:{
          is:{
            pseudo:currentUserPseudo
          }
        }
      }
    })
    const filteredActivity = await prisma.activity.findMany({
      where:{
          areas,
          accomodation,
          healthissue: healthIssue,
          vision,
          mobility,
          language,
          audition,
          sportaddict,
          swim,
          theme:{
              some:{
                  mainTheme,
                  secondTheme,
                  thirdTheme 
              }
          }
      }
    })
    filteredActivity.forEach(element => {
      mycurrentActivity.forEach(elt => {
        if(elt.name.includes(element.name) !== true){
          currentExperience.push(element.id)
        }
      })
    })
    if(currentExperience.length){
      const getData = await prisma.activity.findFirst({
        where:{
          id: currentExperience[Math.floor(Math.random() * currentExperience.length)]
        }
      })
      prisma.$disconnect()
      res.status(200).json(getData)
    }else{
      prisma.$disconnect()
      res.status(500).json('Aucune expérience trouvée')
    }
  }
  res.status(500).json('Aucune expérience trouvée')
  }catch(e){
    console.log(e)
    return{
        redirect: '/experience/dashboard',
        permanent:false
    }
  }
}
