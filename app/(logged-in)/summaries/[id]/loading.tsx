import BgGradient from "@/components/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

function HeaderSkeleton(){
    return <div>Header</div>
}

function ContentSkeleton(){
    return (
        <div className="space-y-4">
            {[...Array(6)].map((_, i)=>(
                <Skeleton 
                    key={i}
                    className={cn('h-4', i % 2 === 0 ? 'w-full' : 'w-11/12 bg-white/80')}
                />
            ))}
        </div>
    )
}

export default function LoadingSummary() {
    return (
        <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
            <BgGradient className="from-rose-400 via-rose-300 to-orange-200"/>
            
            <div className="container mx-auto flex flex-col gap-4">
                <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
                    <div className="flex flex-col gap-8">
                        <HeaderSkeleton/>

                        <div className="relative overflow-hidden">
                            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md
                            rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all
                            duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
                                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center
                                gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3
                                py-1 sm:py-1.5 rounded-full shadow-xs">
                                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400"/>
                                </div>

                                <div className="relative">
                                    <ContentSkeleton/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}