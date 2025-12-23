import { isDev } from "./helpers";

 export const pricingPlans = [
   {
    name: "Dasar",
    price: 10,
    description: "Cocok untuk penggunaan ringan dan kebutuhan dasar.",
    items: [
      "Unggah hingga 10 file PDF per hari", 
      "Bantuan melalui email",
    ],
    id: "dasar",
    paymentLink: isDev
      ?'https://buy.stripe.com/test_8x214p1NTeUm57wb1q14405'
      :'',
    priceId: isDev
      ? 'price_1ScQajRtv5Y4m7xC06lDhAwV'
      : '',
  },
  {
    name: "Pro",
    price: 50,
    description: "Dirancang untuk profesional dan tim yang memerlukan fitur penuh.",
    items: [
      "Unggah tanpa batas jumlah file",
      "Dukungan pelanggan premium",
    ],
    id: "pro",
    paymentLink: isDev
      ?'https://buy.stripe.com/test_fZuaEZgIN4fIfMa6La14403'
      :'',
    priceId: isDev
      ? 'price_1ScPBIRtv5Y4m7xCpbuCiabW'
      : '',
  },
];

export const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

export const itemVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 50,
      duration: 0.8
    }
  }
}