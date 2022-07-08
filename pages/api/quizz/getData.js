// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req,
  res
) {

    const {areas, accomodation, healthIssue, vision, mobility, language, audition, sportaddict, swim, mainTheme, secondTheme, thirdTheme} = req.body
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
  prisma.$disconnect()
  res.status(200).json(filteredActivity)
}
