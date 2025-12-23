import { cn } from "@/lib/utils";
import { containerVariants, pricingPlans } from "@/utils/constants";
import { BadgeCheck, CornerDownRight } from "lucide-react";
import Link from "next/link";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";

type PriceType = {
  name: string;
  price?: number;
  description: string;
  items: string[];
  id: string;
  paymentLink?: string;
  priceId?: string;
};

const ListVariant = {
  hidden: {opacity: 0, x: -20},
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 100
    }
  }
}

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <MotionDiv
    variants={ListVariant}
    whileHover={{scale: 1.02}}
    className="relative w-full max-w-lg hover:scale-105
    hover:transition-all duration-300">
        <div
            className={cn(
                "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
                id === 'dasar' && "border-rose-500 gap-5 border-2"
            )}
        >
            <MotionDiv
            variants={ListVariant}>
                <div className="flex justify-between items-center gap-4">
                    <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
                    <p className="text-base-content/80 mt-2">{description}</p>
                </div>
            </MotionDiv>

            <MotionDiv 
            variants={ListVariant}
            className="flex gap-2">
                <p className="text-5xl tracking-tight font-extrabold">
                    {price ? `Rp ${price}.000` : "Gratis"}
                </p>
                {price && <p className="flex flex-col justify-end mb-[4px]">/Bulan</p>}
            </MotionDiv>

            <MotionDiv 
            variants={ListVariant}
            className="space-y-2.5 leading-relaxed text-base
            flex-1">
                {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                    <BadgeCheck size={18}></BadgeCheck>
                    <span>{item}</span>
                </li>
                ))}
            </MotionDiv>

            {id === "dasar" && (
                <MotionDiv 
                variants={ListVariant}
                className="space-y-2 flex justify-center w-full">
                    {paymentLink ? (
                    <Link href={paymentLink}
                        className="w-full rounded-full flex items-center
                        justify-center gap-2 bg-gradient-to-r from-rose-800
                        to-rose-500 hover:from-rose-500 hover:to-rose-800
                        text-white border-2 py-2">
                        <CornerDownRight size={18} />Beli Sekarang
                    </Link>
                    ) : (
                    <span className="w-full rounded-full flex items-center
                        justify-center gap-2 bg-gradient-to-r from-rose-800
                        to-rose-500 hover:from-rose-500 hover:to-rose-800
                        text-white border-2 py-2">
                            <CornerDownRight size={18} />Beli Sekarang 
                    </span>
                    )}
                </MotionDiv>
            )}

            {id === "pro" && (
                <MotionDiv 
                variants={ListVariant}
                className="space-y-2 flex justify-center w-full">
                    {paymentLink ? (
                    <Link href={paymentLink}
                        className="w-full rounded-full flex items-center
                        justify-center gap-2 bg-gradient-to-r from-rose-800
                        to-rose-500 hover:from-rose-500 hover:to-rose-800
                        text-white border-2 py-2">
                        <CornerDownRight size={18} />Beli Sekarang
                    </Link>
                    ) : (
                    <span className="w-full rounded-full flex items-center
                        justify-center gap-2 bg-gradient-to-r from-rose-800
                        to-rose-500 hover:from-rose-500 hover:to-rose-800
                        text-white border-2 py-2">
                            <CornerDownRight size={18} />Beli Sekarang 
                    </span>
                    )}
                </MotionDiv>
            )}
        </div>
    </MotionDiv>
  );
};

export default function PricingSection() {
  return (
    <MotionSection
    variants={containerVariants}
    initial='hidden'
    whileInView='visible'
    viewport={{once: true, margin: '-100px'}} 
    className="relative overflow-hidden" id="pricing">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6
        lg:px-8 lg:pt-12"
      >
        <MotionDiv className="flex items-center justify-center w-full
        pb-12">
            <h2 className="uppercase font-bold text-xl mb-8
          text-red-500">
                Pilih Langganan
            </h2>
        </MotionDiv>

        <div
          className="relative flex justify-center flex-col
            lg:flex-row items-center lg:items-stretch gap-8"
        >
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}