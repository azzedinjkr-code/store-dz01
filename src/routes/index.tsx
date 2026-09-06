import { createFileRoute } from "@tanstack/react-router";
import { PRODUCT } from "@/data/product";
import { ProductGallery } from "@/components/ProductGallery";
import { Features } from "@/components/Features";
import { TrustBar } from "@/components/TrustBar";
import { OrderForm } from "@/components/OrderForm";
import { Faq } from "@/components/Faq";
import rodessLogo from "@/assets/rodess-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "حقيبة مدرسية Rodess — 1500 دج مع الدفع عند الاستلام" },
      {
        name: "description",
        content:
          "حقيبة مدرسية عصرية وعملية للأطفال بلون كراميل، أحزمة مبطّنة وجيوب متعددة. 1500 دج، توصيل إلى كل الولايات والدفع عند الاستلام.",
      },
      { property: "og:title", content: "حقيبة مدرسية Rodess — 1500 دج" },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content: "حقيبة مدرسية عملية ومريحة لطفلك. اطلبها الآن، الدفع عند الاستلام والتوصيل لكل الولايات.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "حقيبة مدرسية Rodess — 1500 دج" },
      {
        name: "twitter:description",
        content: "حقيبة مدرسية عملية ومريحة لطفلك، مع الدفع عند الاستلام والتوصيل لكل الولايات.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const scrollToOrder = () =>
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-background">
      {/* Header - لوغو في أقصى اليسار تماماً على حافة الشاشة */}
      <header className="relative border-b border-border bg-card shadow-header">
        <div className="flex h-24 w-full items-center justify-between gap-3 px-2" dir="ltr">
          <div className="flex min-w-0 items-center justify-start" dir="ltr">
            <img
              src={rodessLogo}
              alt="Rodess - حقائب ظهر مدرسية"
              width={512}
              height={512}
              className="h-20 w-20 shrink-0 object-contain drop-shadow-md"
            />
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-secondary px-3.5 py-2 text-xs font-extrabold text-secondary-foreground" dir="rtl">
            <span className="h-2 w-2 rounded-full bg-cta" aria-hidden="true" />
            عرض الدخول المدرسي
          </span>
        </div>
      </header>

      <section className="mx-auto w-full max-w-3xl px-4">
        <ProductGallery />
        <div className="animate-slide-up mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-cta/15 border border-primary/20 px-4 py-1.5 text-xs font-black text-primary">
            <span className="h-2 w-2 rounded-full bg-cta animate-pulse" />
            الأكثر مبيعاً - جديد 2026
          </div>
          <h1 className="mt-4 text-[28px] font-black leading-[1.25] tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">حقيبة عصرية</span>
            <span className="mx-2 inline-flex items-center justify-center rounded-xl bg-primary px-2.5 py-1 text-[22px] font-black text-primary-foreground rotate-[-2deg]">وعملية 🎒</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {PRODUCT.short}
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-1">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-extrabold text-foreground">
                {PRODUCT.price.toLocaleString("en-US")}
              </span>
              <span className="text-lg font-bold text-primary">{PRODUCT.currency}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground line-through">
                {PRODUCT.originalPrice.toLocaleString("en-US")} {PRODUCT.currency}
              </span>
              <span className="rounded-full bg-cta/10 px-2 py-0.5 font-extrabold text-cta">
                وفّر {PRODUCT.originalPrice - PRODUCT.price} {PRODUCT.currency}
              </span>
            </div>
          </div>
          <button type="button" onClick={scrollToOrder} className="btn-cta mt-5 w-full max-w-sm">
            اطلب الآن
          </button>
        </div>
      </section>

      <TrustBar />

      <Features />

      {/* قسم لماذا تختارها - الوصف الجديد */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-1">
        <div className="rounded-3xl bg-primary p-6 text-center shadow-soft">
          <h2 className="text-xl font-extrabold text-primary-foreground">لماذا تختارها؟</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/85">
            🎒 حقيبة عملية وأنيقة تناسب الاستخدام اليومي: مساحة واسعة لتنظيم أغراضك، جيوب مرتّبة للوصول السريع إلى ما تحتاجه، وأحزمة مبطّنة تمنحك راحة أفضل أثناء الحمل. تصميم عصري يجمع بين العملية والأناقة ليكون خيارًا مناسبًا لكل يوم.
            <br />
            <br />
            السعر الأصلي {PRODUCT.originalPrice.toLocaleString("en-US")} {PRODUCT.currency}، الآن بـ {PRODUCT.price.toLocaleString("en-US")} {PRODUCT.currency} فقط مع الدفع عند الاستلام. اطلبها الآن! 🔥
          </p>
          <button type="button" onClick={scrollToOrder} className="btn-outline-pro mt-5 group">
            <span>🎒</span>
            <span>اطلبها الآن</span>
            <span className="transition-transform group-hover:translate-x-[-2px]">←</span>
          </button>
        </div>
      </section>

      <OrderForm />

      <div className="mt-0">
        <Faq />
      </div>

      <footer className="mx-auto max-w-3xl px-4 pb-8 text-center text-xs text-muted-foreground">
      </footer>
    </main>
  );
}
