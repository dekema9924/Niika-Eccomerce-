'use server'
import { v2 as cloudinary } from "cloudinary";
import { getUserSession } from "./getUserSession";



const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "";
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "";
const CLOUDINARY_UPLOAD_FOLDER = process.env.CLOUDINARY_UPLOAD_FOLDER || "";


export const generateCloudinarySignatureAction = async () => {
    // The implementation of getCurrentUser is not relevant for this blog post
    // However, this is only to show you that you need to protect your server actions
    // if image upload is only for authenticated users
    const currentUser = await getUserSession();

    if (!currentUser) {
        throw new Error("User not authenticated")
    }

    // Configure your Cloudinary instance with the properties obtained from the environment
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
    });

    // Every signature is parametrized for the specific upload needed
    const paramsToSign = {
        timestamp: Math.floor(new Date().getTime() / 1000), // Unix timestamp in seconds
        folder: CLOUDINARY_UPLOAD_FOLDER, // The folder to upload the image to
        tags: "avatar-image", // Optionally, tags to add to the image, comma separated
    };

    // Call the Cloudinary SDK to sign the parameters
    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        CLOUDINARY_API_SECRET,
    );


    // All of the following properties are needed on the frontend to perform the upload
    return {
        signature: signature,
        apiKey: CLOUDINARY_API_KEY,
        cloudName: CLOUDINARY_CLOUD_NAME,
        timestamp: paramsToSign.timestamp,
        folder: paramsToSign.folder,
        tags: paramsToSign.tags,
    };
};