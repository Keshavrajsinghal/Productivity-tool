import { storage } from "@/appwrite";
import { Image } from "@/typings"; // Check the import path to 'typings.d.ts'



const getUrl = async (image: Image) => {
    const url = storage.getFilePreview(image.bucketId, image.fileId);
    return url;
};

export default getUrl