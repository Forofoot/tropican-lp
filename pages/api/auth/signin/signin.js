import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default async function handler(
    req,
    res
) {
    if (req.method === 'POST') {

        const { pseudo, password } = req.body

        let resultGrandParent = await prisma.grandparent.findFirst({
            where: {
                pseudo
            }
        });

        let resultGrandChildren = await prisma.grandchildren.findFirst({
            where: {
                pseudo
            }
        });
        
        if (resultGrandChildren) {
            const checkGrandChildrenPassword = await compare(password, resultGrandChildren.password);
            if(!checkGrandChildrenPassword){
                res.status(500).json({message: 'Mauvais mot de passe'})
            }else{
                res.status(200).json({
                    firstName: resultGrandChildren.firstName,
                    lastName: resultGrandChildren.lastName,
                    avatar: resultGrandChildren.avatar,
                    avatar_publicId: resultGrandChildren.avatar_publicId,
                    email: resultGrandChildren.email,
                    pseudo: resultGrandChildren.pseudo,
                    id: resultGrandChildren.id
                })
            }
        }

        if (resultGrandParent) {
            const checkGrandParentPassword = await compare(password, resultGrandParent.password);
            if(!checkGrandParentPassword){
                res.status(500).json({message: 'Mauvais mot de passe'})
            }else{
                res.status(200).json({
                    firstName: resultGrandParent.firstName,
                    lastName: resultGrandParent.lastName,
                    avatar: resultGrandParent.avatar,
                    avatar_publicId: resultGrandParent.avatar_publicId,
                    email: resultGrandParent.email,
                    pseudo: resultGrandParent.pseudo,
                    id: resultGrandParent.id
                })
            }
        }

        if(!resultGrandChildren || !resultGrandParent){
            res.status(500).json({message: 'Aucun utilisateur trouvé'})
        }
    }
}