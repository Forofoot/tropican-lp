import { uploadAvatar } from "../../../utils/cloudinary";
import { IncomingForm } from "formidable";
import { PrismaClient } from "@prisma/client";

const cloudinary = require("cloudinary").v2;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(req, res) {
  try{
    const prisma = new PrismaClient()
  
    const data = await new Promise(function (resolve, reject) {
      const form = new IncomingForm({ keepExtensions: true });
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
  
    const file = data.files.image
    const {userId} = data.fields
    const {currentAvatar} = data.fields
    const {currentPseudo} = data.fields
    
    const parsedId = parseInt(userId)
  
    const deleteOldImage = await cloudinary.uploader.destroy(
      currentAvatar
    );
    const imageData = await uploadAvatar(file.path);
  
    const grandChildrenResult = await prisma.grandchildren.findUnique({
      where:{
        pseudo: currentPseudo
      }
    })
  
    const grandParentResult = await prisma.grandparent.findUnique({
      where:{
        pseudo: currentPseudo
      }
    })
  
    if(grandChildrenResult){
      const result = await prisma.grandchildren.update({
        where:{
            id:parsedId
        },
        data:{
          avatar:imageData.url,
          avatar_publicId: imageData.public_id
        }
      });
      await prisma.$disconnect()
      res.status(200).json({
        pseudo: result.pseudo,
        role: result.role
      })
    }
  
    if(grandParentResult){
      const result = await prisma.grandparent.update({
        where:{
            id:parsedId
        },
        data:{
          avatar:imageData.url,
          avatar_publicId: imageData.public_id
        }
      });
      await prisma.$disconnect()
      res.status(200).json({
        pseudo: result.pseudo,
        role: result.role
      })
    }
  
    if(!grandParentResult && !grandChildrenResult){
      res.status(500).json('Aucun utilisateur trouvé')
    }
  }catch(e){
    console.log(e)
    res.status(500).json('Erreur fatale')
  }
  
}