import { PrismaClient } from '@prisma/client'

export default async function handler(
    req, res
) {

    
    //Only POST mothod is accepted
    try{
        if (req.method === 'POST') {
            let currentExperience = []
            const prisma = new PrismaClient();
            //Getting email and password from body
            const { bodySearch, pseudo } = req.body
            //Validate
            
            const resultGrandParent = await prisma.grandparent.findUnique({
                where:{
                    pseudo
                }
            })

            const resultGrandChildren = await prisma.grandchildren.findUnique({
                where:{
                    pseudo
                }
            })
            if(resultGrandParent){
                const mycurrentRelation = await prisma.relation.findMany({
                    where:{
                        grandParent_id: resultGrandParent.id,
                        grandChildren:{
                            is:{
                                pseudo:{
                                    contains:bodySearch
                                }
                            }
                        }
                    },
                    select:{
                        grandChildren:{
                            select:{
                                pseudo:true
                            }
                        }
                    }
                })

                    const resultSearch = await prisma.grandchildren.findMany({
                    where:{
                        pseudo:{
                            contains: bodySearch
                        }
                    },
                    take:1 
                })

                if(!mycurrentRelation.length){
                    const resultSearch = await prisma.grandchildren.findMany({
                        where:{
                            pseudo:{
                                contains: bodySearch
                            }
                        }
                    })
                    await prisma.$disconnect()
                    res.status(200).json(resultSearch)
                }else{
                    res.status(500).json('Aucun Grandparent ne possède ce pseudo')
                }
            }
            if(resultGrandChildren){
                const mycurrentRelation = await prisma.relation.findMany({
                    where:{
                        grandChildren_id: resultGrandChildren.id,
                        grandparent:{
                            is:{
                                pseudo:{
                                    contains:bodySearch
                                }
                            }
                        }
                    },
                    select:{
                        grandparent:{
                            select:{
                                pseudo:true
                            }
                        }
                    }
                })
                const resultSearch = await prisma.grandparent.findMany({
                    where:{
                        pseudo:{
                            contains: bodySearch
                        }
                    }
                })
                if(!mycurrentRelation.length){
                    const resultSearch = await prisma.grandparent.findMany({
                        where:{
                            pseudo:{
                                contains: bodySearch
                            }
                        }
                    })
                    await prisma.$disconnect()
                    res.status(200).json(resultSearch)
                }else{
                    res.status(500).json('Aucun Grandparent ne possède ce pseudo')
                }
            }
        }
    }catch(e) {
        //Response for other than POST method
        console.log(e)
    }
}