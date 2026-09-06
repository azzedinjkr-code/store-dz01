import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const QA = [
  {
    q: "كيف يتم الدفع؟",
    a: "الدفع يكون عند الاستلام 💰\nلا تدفع أي مبلغ مسبقًا، ادفع فقط عند استلام طلبك.",
  },
  {
    q: "هل التوصيل متوفر في جميع ولايات الجزائر؟",
    a: "نعم 🇩🇿، نوفر التوصيل إلى جميع 69 ولاية، سواء إلى المكتب أو إلى المنزل، حسب الخيار المتاح في منطقتك.",
  },
  {
    q: "كم يستغرق وصول الطلب؟",
    a: "⚡ نعمل على توصيل طلبك في أسرع وقت ممكن. بعد تأكيد الطلب، يتم شحنه مباشرة، ويصل عادةً خلال 24 إلى 72 ساعة حسب ولايتك والبلدية.",
  },
  {
    q: "كيف أعرف تكلفة التوصيل؟",
    a: "بكل سهولة! بعد اختيار الولاية والبلدية وطريقة التوصيل في استمارة الطلب، يتم احتساب السعر الإجمالي تلقائيًا قبل تأكيد الطلب.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-4 pt-3 pb-8">
      <h2 className="text-center text-2xl font-extrabold text-foreground">أسئلة شائعة</h2>
      <div className="mt-5 space-y-3">
        {QA.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className={`overflow-hidden rounded-2xl border bg-card transition-colors ${
                isOpen ? "border-primary/40 shadow-soft" : "border-border"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 p-4 text-right"
              >
                <span className="text-sm font-bold leading-relaxed text-foreground">{item.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
                    isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="whitespace-pre-line px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
