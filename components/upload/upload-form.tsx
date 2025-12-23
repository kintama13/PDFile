'use client'
// schema dangan zod
import z from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";


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
    const formRef = useRef<HTMLFormElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

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

        try{
            setIsLoading(true)
            const formData = new FormData(e.currentTarget)
            const file = formData.get('file') as File

            // validasi file
            const validatedFields = schema.safeParse({file})

            console.log(validatedFields)

            if (!validatedFields.success) {
                toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'File invalid')
                setIsLoading(false)
                return
            }

            toast.info("Upload PDF....")
            
            // upload file ke uploadthing

            const resp = await startUpload([file])
            if (!resp) {
                toast.error('Telah terjadi Kesalahan, tolong ganti file mu')
                setIsLoading(false)
                return
            }

            toast.info("PDF diproses....")

            // parse pdf menggunakan lang chain
            const result = await generatePdfSummary(resp)
            
            const {data = null, message = null} = result || {}

            if (data) {
                let storeResult: any
                toast.info("Menyimpan PDF....")
                if(data.summary){
                    storeResult = await storePdfSummaryAction({
                        fileUrl: resp[0].serverData.file.url,
                        summary: data.summary,
                        title: data.title,
                        fileName: file.name
                    })

                    toast.info('Rangkuman sudah dibuat')
                }

                formRef.current?.reset()
                router.push(`/summaries/${storeResult.data.id}`)
            }
       
        }catch(error){
            setIsLoading(false)
            console.error('telah terjadi error', error)
            formRef.current?.reset()
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden='true'>
                    <div className="w-full border-t border-gray-200 dark:border-gray-800"/>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-background px-3 text-muted-foreground text-sm">
                        Upload PDF
                    </span>
                </div>
            </div>
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
            {isLoading && (
                <>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden='true'>
                            <div className="w-full border-t border-gray-200 dark:border-gray-800"/>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background px-3 text-muted-foreground text-sm">
                                Memuat
                            </span>
                        </div>
                    </div>
                    <LoadingSkeleton/>
                </>
            )}
        </div>
    );
}