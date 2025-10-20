'use client'

import z from "zod";
import UploadFormInput from "./upload-form-input";

const schema = z.object({
    file: z
    .instanceof(File, {message: 'file invalid'})
    .refine(
        (file) => file.size <= 20 * 1024 * 1024, 
        'Ukuran file harus kurang dari 20MB'
    )
    .refine(
        (file) => file.type.startsWith('application/pdf'),
        'File harus PDF'
    )
})

export default function UploadForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submitted')
        const formData = new FormData(e.currentTarget)
        const file = formData.get('file') as File

        // validasi file
        const validatedFields = schema.safeParse({file})

        if (!validatedFields.success) {
            console.log(
                validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'File invalid'
            )
            return
        }
        // schema dangan zod
        // upload file ke uploadthing
        // parse pdf menggunakan lang chain
        // rangkum file pdf menggunakan AI
        // simpan rangkuman di dalam database
        // kembali ke halaman rangkuman [id]
    }
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput onSubmit={handleSubmit}/>
        </div>
    );
}