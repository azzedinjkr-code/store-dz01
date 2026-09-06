// معلومات المنتج والسعر — قابلة للتعديل بسهولة - تم تحويل الصور للعمل محليا
export const PRODUCT = {
  name: "حقيبة مدرسية Rodess",
  tagline: "حقيبة عصرية وعملية ترافق ولدك طول العام الدراسي",
  short:
    "حقيبة ظهر بلون كراميل هادئ، بجيب أمامي مطرّز برسومات لطيفة ومحفظة صغيرة بشعار Rodess، مع أحزمة مبطّنة قابلة للتعديل وجيوب متعددة تكفي لكل أدوات المدرسة.",
  price: 1500,
  originalPrice: 2200,
  currency: "دج",
  images: [
    { src: "/images/bag-main.jpg", alt: "حقيبة مدرسية Rodess بلون كراميل — صورة كاملة" },
    { src: "/images/bag-detail-pocket.jpg", alt: "الجيب الأمامي المطرّز والمحفظة الصغيرة بشعار Rodess" },
    { src: "/images/bag-detail-straps.jpg", alt: "الأحزمة المبطّنة القابلة للتعديل والجيب الجانبي" },
    { src: "/images/bag-detail-zip.jpg", alt: "الجيوب السفلية بسحابات وقاعدة الحقيبة" },
  ],
} as const;
