// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req,
  res
) {
 if( req.method === 'POST'){
    const {name, place, start, end, long, lat, currentUserPseudo, relationId} = req.body

    const checkGrandParent = await prisma.grandparent.findUnique({
      where:{
            pseudo:currentUserPseudo
        }
    })
  
    const checkGrandChildren = await prisma.grandchildren.findUnique({
      where:{
            pseudo:currentUserPseudo
        }
    })

    if(checkGrandChildren){
      const createExperience = await prisma.experience.create({
          data:{
              name,
              place,
              start,
              end,
              long,
              lat,
              grandParent_id : parseInt(relationId),
              grandChildren_id : checkGrandChildren.id
          }
      })
      prisma.$disconnect()
      res.status(200).json(createExperience)
    }
    if(checkGrandParent){
      const createExperience = await prisma.experience.create({
          data:{
              name,
              place,
              start,
              end,
              long,
              lat,
              grandParent_id: checkGrandParent.id,
              grandChildren_id: parseInt(relationId)
          }
      })
      prisma.$disconnect()
      res.status(200).json(createExperience)
    }
    if(!checkGrandChildren && !checkGrandParent){
        prisma.$disconnect()
        return false
    }
 }
}
