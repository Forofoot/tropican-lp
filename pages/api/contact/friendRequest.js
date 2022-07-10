import { PrismaClient } from '@prisma/client'

export default async function handler(
    req, res
) {

    
    try{
        if (req.method === 'POST') {
            const prisma = new PrismaClient();
            //Getting email and password from body
            const { pseudo } = req.body
            //Validate
    
            let resultGrandParent = await prisma.grandparent.findUnique({
                where: {
                    pseudo
                }
            });
    
            let resultGrandChildren = await prisma.grandchildren.findUnique({
                where: {
                    pseudo
                }
            });
    
            if(resultGrandChildren){
                console.log('oui')
                const friendRequest = await prisma.notification.findMany({
                    where:{
                      grandChildren_id: resultGrandChildren.id
                    },
                    select:{
                        sender:true,
                        grandParent_id:true,
                        grandparent:{
                            select:{
                                pseudo:true,
                                avatar:true
                            }
                        }
                    }
                })
                await prisma.$disconnect()
                res.status(200).json(friendRequest)
            }

            if(resultGrandParent){
                console.log('non')
                const friendRequest = await prisma.notification.findMany({
                    where:{
                      grandParent_id: resultGrandParent.id
                    },
                    select:{
                        sender:true,
                        grandChildren_id:true,
                        grandChildren:{
                            select:{
                                pseudo:true,
                                avatar:true
                            }
                        }
                    }
                })
                await prisma.$disconnect()
                res.status(200).json(friendRequest)
            }

            if(!resultGrandParent && !resultGrandChildren){
                res.status(500).json({message: 'Aucune demande d\'ami'})
            }
        } else {
            //Response for other than POST method
            res.status(500).json({ message: 'Route not valid' });
        }
    }catch(e){
        console.log('test')
    }
    //Only POST mothod is accepted
}