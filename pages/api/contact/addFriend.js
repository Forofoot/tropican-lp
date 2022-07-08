import { PrismaClient } from '@prisma/client'

export default async function handler(
    req, res
) {

    
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        //Getting email and password from body
        const { pseudo, role, currentUser, currentUserId } = req.body
        //Validate
        if (!pseudo) {
            res.status(422).json({ message: 'Invalid Data' })
            return
        }

        let resultGrandParent = await prisma.grandparent.findUnique({
            where: {
                pseudo: currentUser
            }
        });

        let resultGrandChildren = await prisma.grandchildren.findUnique({
            where: {
                pseudo: currentUser
            }
        });

        const findReceiverGrandChildren = await prisma.grandchildren.findUnique({
            where:{
                pseudo
            }
        })
        const findReceiverGrandParent = await prisma.grandparent.findUnique({
            where:{
                pseudo
            }
        })
        if(findReceiverGrandParent){
            if(role === resultGrandChildren.role){
                const notificationExist = await prisma.notification.findUnique({
                    where:{
                        grandChildren_id : currentUserId,
                        grandParent_id: findReceiverGrandParent.id
                    }
                })
                if(!notificationExist){
                    const createFriendRequest = await prisma.notification.create({
                        data:{
                            grandParent_id: findReceiverGrandParent.id,
                            grandChildren_id: currentUserId,
                            sender: role
                        }
                    })
                    await prisma.$disconnect()
                    res.status(201).json({ message: 'Friend request send'})
                }
                res.status(500).json({message: 'Déjà demandé'})
            }
        }

        if(findReceiverGrandChildren){
            if(role === resultGrandParent.role){
                const notificationExist = await prisma.notification.findUnique({
                    where:{
                        grandChildren_id: findReceiverGrandChildren.id,
                        grandParent_id: currentUserId
                    }
                })
                if(!notificationExist){
                    const createFriendRequest = await prisma.notification.create({
                        data:{
                            grandParent_id: currentUserId,
                            grandChildren_id: findReceiverGrandChildren.id,
                            sender: role
                        }
                    })
                    await prisma.$disconnect()
                    res.status(201).json({ message: 'Friend request send'})
                }
                res.status(500).json({message: 'Déjà demandé'})
            }
        }
        res.status(500).json({message: 'Aucun user trouvé'})
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}