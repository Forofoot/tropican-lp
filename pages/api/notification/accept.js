import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req,
    res
) {
    try{
        if (req.method === 'POST') {

            const { currentUser, relationID, sender } = req.body

            const letCheckCurrentUserGrandChildren = await prisma.grandchildren.findUnique({
                where:{
                    pseudo:currentUser
                }
            }) 


            const letCheckCurrentUserGrandParent = await prisma.grandparent.findUnique({
                where:{
                    pseudo:currentUser
                }
            })   

            if(letCheckCurrentUserGrandChildren){
                if(sender == 'grandparent'){
                    let notificationGrandChildren = await prisma.notification.findFirst({
                        where:{
                            grandParent_id: relationID,
                            grandChildren_id: letCheckCurrentUserGrandChildren.id
                        }
                    })
                    if(notificationGrandChildren){
                        let deleteNotification = await prisma.notification.delete({
                            where: {
                                id: notificationGrandChildren.id,
                            }
                        }); 
                        let createRelation = await prisma.relation.create({
                            data:{
                                grandParent_id: relationID,
                                grandChildren_id: letCheckCurrentUserGrandChildren.id
                            }
                        })
                        await prisma.$disconnect()
                        res.status(201).json({message: "demande d'ami Accepté"})
                    }                    
                }else{
                    res.status(500).json({message: "Erreur"})
                }
            }
            
            if(letCheckCurrentUserGrandParent){
                if(sender == 'grandchildren'){
                    let notificationGrandParent = await prisma.notification.findFirst({
                        where:{
                            grandParent_id: letCheckCurrentUserGrandParent.id,
                            grandChildren_id: relationID
                        }
                    })
                    if(notificationGrandParent){
                        let deleteNotification = await prisma.notification.delete({
                            where: { 
                                id: notificationGrandParent.id
                            }
                        });
                        let createRelation = await prisma.relation.create({
                            data:{
                                grandParent_id: letCheckCurrentUserGrandParent.id,
                                grandChildren_id: relationID
                            }
                        })
                        await prisma.$disconnect()
                        res.status(201).json({message: "demande d'ami Accepté"})
                    }
                }else{
                    res.status(500).json({message: "Erreur"})
                }
            }
        }
    }catch(e){
        console.log(e)
    }
}