import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadInCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder: 'AI-App' });
        fs.unlinkSync(filePath); // Delete the local file after upload
        return {
            public_id: result.public_id,
            url: result.secure_url
        };
    } catch (error) {
        fs.unlinkSync(filePath); // Delete the local file in case of error
        console.log('Error uploading to Cloudinary:', error);
        throw error;
    }   
};

export { uploadInCloudinary };