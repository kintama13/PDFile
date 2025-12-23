import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import {UploadThingError} from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({pdf: {maxFileSize: '32MB'}}).
        middleware(async({req}) =>{
            // get user info
            const user = await currentUser()

            if(!user) throw new UploadThingError('User tidak ada')
            
            return {userId: user.id}
        }
    ).onUploadComplete(async({metadata, file}) => {
        console.log('upload berhasil untuk id user', metadata.userId)
        console.log('file url', file.url)
        return {userId: metadata.userId, fileUrl: file.url, fileName: file.name}
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter