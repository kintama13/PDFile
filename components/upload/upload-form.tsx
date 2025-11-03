'use client'
// schema dangan zod
import z, { promise } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";


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
    const {startUpload, routeConfig} = useUploadThing
    ('pdfUploader', {
        onClientUploadComplete: () => {
            console.log('upload berhasil')
        },
        onUploadError: (err) => {
            console.error('error terjadi saat upload', err)
            toast.error('Terjadi Kesalahan Saat Upload File')
        },
        onUploadBegin:({file}) => {
            console.log('upload dimulai untuk file', file)
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const file = formData.get('file') as File

        // validasi file
        const validatedFields = schema.safeParse({file})

        if (!validatedFields.success) {
            toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'File invalid')
            return
        }

         toast.info("Upload PDF....")
        
        // upload file ke uploadthing

        const resp = await startUpload([file])
        if (!resp) {
            toast.error('Telah terjadi Kesalahan, tolong ganti file mu')
            return
        }

        toast.info("PDF diproses....")

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