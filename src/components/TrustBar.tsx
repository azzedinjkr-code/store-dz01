import trustStrip from "@/assets/trust-strip.jpg.asset.json";

export function TrustBar() {
  return (
    <div className="mt-5 mb-5 w-full">
      <div className="mx-auto w-full max-w-4xl px-2 sm:px-4">
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)]">
          <img
            src={trustStrip.url}
            alt="توصيل سريع وآمن، الدفع عند الاستلام، منتجات عالية الجودة"
            className="h-auto w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
