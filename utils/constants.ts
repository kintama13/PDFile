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