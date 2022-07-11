import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req,
    res
) {
    if (req.method === 'POST') {

        try{
        const {relationID, sender, currentUser } = req.body


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
                                id: notificationGrandChildren.id
                            }
                        }); 
                        await prisma.$disconnect()
                        res.status(201).json({message: "demande d'amis refusé"})
                    }
                }
            }
            if(letCheckCurrentUserGrandParent){
                if(sender == 'grandchildren'){
                    let notificationGrandParent = await prisma.notification.findFirst({
                        where:{
                            grandParent_id: letCheckCurrentUserGrandParent.id,
                            grandChildren_id:relationID
                        }
                    })
                    console.log(notificationGrandParent)
                    if(notificationGrandParent){
                        let deleteNotification = await prisma.notification.delete({
                            where: {
                                id: notificationGrandParent.id
                            }
                        }); 
                        await prisma.$disconnect()
                        res.status(201).json({message: "demande d'amis refusé"})
                    }
                }
            }
        }catch(e){
            console.log(e)
        }
    }
}