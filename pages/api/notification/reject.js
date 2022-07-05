import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req,
    res
) {
    if (req.method === 'POST') {

        const { currentUserID, relationID, sender } = req.body

        if(sender == 'grandchildren'){
            let notificationGrandChildren = await prisma.notification.findFirst({
                where:{
                    grandParent_id: relationID,
                    grandChildren_id: currentUserID
                }
            })
           let deleteNotification = await prisma.notification.delete({
                where: {
                    id: notificationGrandChildren.id
                }
            }); 
            res.status(201).json({message: "demande d'amis refusé"})
        }

        if(sender == 'grandparent'){
            let notificationGrandParent = await prisma.notification.findFirst({
                where:{
                    grandParent_id: currentUserID,
                    grandChildren_id: relationID
                }
            })
           let deleteNotification = await prisma.notification.delete({
                where: {
                    id: notificationGrandParent.id
                }
            }); 
             res.status(201).json({message: "demande d'amis refusé"})
        }
    }
}