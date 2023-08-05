import { ID, storage } from "@/appwrite"

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        "64b74056de15921e5593",
        ID.unique(),
        file
    );
    return fileUploaded;
};

export default uploadImage;