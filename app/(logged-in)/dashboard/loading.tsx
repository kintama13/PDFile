import BgGradient from "@/components/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { itemVariants } from "@/utils/constants";

function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      
      {/* Title & subtitle */}
      <div className="flex flex-col gap-2">
        <MotionH1
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold tracking-tight"
        >
          <Skeleton className="h-10 w-40" />
        </MotionH1>

        <MotionP
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Skeleton className="h-6 w-96 max-w-full" />
        </MotionP>
      </div>

      {/* Button skeleton */}
      <MotionDiv
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="self-start"
      >
        <Skeleton className="h-10 w-32" />
      </MotionDiv>
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
    >
      <Skeleton className="h-48 w-full rounded-md" />
    </MotionDiv>
  );
}

export default function LoadingSummaries() {
  return (
    <div className="min-h-screen relative">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />

      <section className="container px-10 py-24 mx-auto flex flex-col gap-6">
        <HeaderSkeleton />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
