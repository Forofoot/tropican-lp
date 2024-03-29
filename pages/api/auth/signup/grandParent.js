import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req, res
) {

    const prisma = new PrismaClient();
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { firstName, lastName, pseudo, email, password } = req.body
        //Validate
        if (!firstName || !lastName || !pseudo || !email || !password) {
            res.status(422).json({ message: 'Invalid Data' })
            return
        }

        const grandChildrenExist = await prisma.grandchildren.findUnique({
            where:{
                pseudo
            }
        })

        const grandParentExist = await prisma.grandchildren.findUnique({
            where:{
                pseudo
            }
        })
        //Hash password
        if(grandChildrenExist || grandParentExist){
            res.status(500).json({ message: 'Existe déjà'})
        }
         const status = await prisma.grandparent.create({
            data:{
                firstName,
                lastName,
                email,
                pseudo,
                password: await hash(password, 12),
            }
        })
        await prisma.$disconnect()
        //Send success response
        res.status(201).json();
        //Close DB connection
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}