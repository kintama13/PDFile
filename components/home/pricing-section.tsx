import { cn } from "@/lib/utils";
import { BadgeCheck, CornerDownRight } from "lucide-react";
import Link from "next/link";

type PriceType = {
  name: string;
  price?: number;
  description: string;
  items: string[];
  id: string;
  paymentLink?: string;
  priceId?: string;
};

const plans: PriceType[] = [
  {
    name: "Dasar",
    description: "Cocok untuk penggunaan ringan dan kebutuhan dasar.",
    items: ["Unggah hingga 2 file PDF per hari", "Bantuan melalui email"],
    id: "dasar",
  },
  {
    name: "Pro",
    price: 150,
    description: "Dirancang untuk profesional dan tim yang memerlukan fitur penuh.",
    items: [
      "Unggah tanpa batas jumlah file",
      "Prioritas pemrosesan server",
      "Dukungan pelanggan premium",
    ],
    id: "pro",
    paymentLink: "",
    priceId: "",
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105
    hover:transition-all duration-300">
        <div
            className={cn(
                "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
                id === 'dasar' && "border-rose-500 gap-5 border-2"
            )}
        >
            <div>
                <div className="flex justify-between items-center gap-4">
                    <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
                    <p className="text-base-content/80 mt-2">{description}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <p className="text-5xl tracking-tight font-extrabold">
                    {price ? `Rp ${price}.000` : "Gratis"}
                </p>
                {price && <p className="flex flex-col justify-end mb-[4px]">/Bulan</p>}
            </div>

            <div className="space-y-2.5 leading-relaxed text-base
            flex-1">
                {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                    <BadgeCheck size={18}></BadgeCheck>
                    <span>{item}</span>
                </li>
                ))}
            </div>

            {id === "pro" && (
                <div className="space-y-2 flex justify-center w-full">
                    {paymentLink ? (
                    <Link href={paymentLink}>
                        Beli Sekarang
                    </Link>
                    ) : (
                    <span className="w-full rounded-full flex items-center
                        justify-center gap-2 bg-linear-to-r from-rose-800
                        to-rose-500 hover:from-rose-500 hover:to-rose-800
                        text-white border-2 py-2">
                            <CornerDownRight size={18} />Beli Sekarang 
                    </span>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6
        lg:px-8 lg:pt-12"
      >
        <div className="flex items-center justify-center w-full
        pb-12">
            <h2 className="uppercase font-bold text-xl mb-8
          text-red-500">
                Pilih Langganan
            </h2>
        </div>

        <div
          className="relative flex justify-center flex-col
            lg:flex-row items-center lg:items-stretch gap-8"
        >
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
