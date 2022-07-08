import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';


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
                return false
            }else{
                res.status(200).json({
                    pseudo: resultGrandChildren.pseudo,
                    role: resultGrandChildren.role
                })
                await prisma.$disconnect()
            }
        }

        if (resultGrandParent) {
            const checkGrandParentPassword = await compare(password, resultGrandParent.password);
            if(!checkGrandParentPassword){
                res.status(500).json('Mot de passe ou nom d\'utilisateur incorrect')
            }else{
                res.status(200).json({
                    pseudo: resultGrandParent.pseudo,
                    role: resultGrandParent.role
                })
                await prisma.$disconnect()
            }
        }

        if(!resultGrandChildren || !resultGrandParent){
            return false
        }
    }
}