import { getImage } from "../../utils/formidable";
import { uploadImage } from "../../utils/cloudinary";
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(req, res) {
  const prisma = new PrismaClient()
  const imageUploaded = await getImage(req);

  const imageData = await uploadImage(imageUploaded.path);

  console.log(imageData)
  console.log(imageData.public_id)

  const result = await prisma.grandparent.update({
    where:{
        id:4
    },
    data: {
      avatar: imageData.public_id,
    },
  });

  res.json(result);
}