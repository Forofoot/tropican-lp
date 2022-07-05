const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export function uploadAvatar(imageUploaded) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUploaded,
      { crop: "fill", folder: 'avatar' },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
}

export function destroyAvatar(imageUploaded){
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        imageUploaded
    );
  });
}