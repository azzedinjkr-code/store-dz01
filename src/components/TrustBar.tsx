import trustStrip from "@/assets/trust-strip.jpg.asset.json";

export function TrustBar() {
  return (
    <div className="mx-auto mt-4 mb-4 w-full max-w-3xl px-4">
      <img
        src={trustStrip.url}
        alt="توصيل سريع وآمن، الدفع عند الاستلام، منتجات عالية الجودة"
        className="w-full rounded-2xl object-contain shadow-soft"
        loading="lazy"
      />
    </div>
  );
}
