import { Droplets, Activity, Backpack } from "lucide-react";

const FEATURES = [
  { icon: Droplets, title: "مقاوم 100% للماء", desc: "نسيج Oxford 900D مقاوم للماء والغبار بمعالجة PU متطورة", accent: "from-cyan-500 to-teal-500", bg: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  { icon: Activity, title: "راحة طبية للظهر", desc: "ظهر مبطن بإسفنج طبي + أحزمة S-shaped مريحة وقابلة للتعديل", accent: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { icon: Backpack, title: "تصميم عصري 2026", desc: "لون أزرق ملكي أنيق يناسب البنات والأولاد - الأكثر مبيعاً", accent: "from-blue-500 to-violet-500", bg: "bg-blue-50 text-blue-600 border-blue-100" },
];

export function Features() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 pt-0 pb-10">

      <div className="mt-0 space-y-3">
        {FEATURES.map((f, idx) => (
          <div
            key={f.title}
            className="group relative flex items-center gap-4 overflow-hidden rounded-[20px] border bg-card p-5 shadow-soft transition-all hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.15)] hover:border-primary/20"
          >
            <div className={`absolute right-0 top-0 h-full w-1 bg-gradient-to-b ${f.accent}`} />
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-gradient-to-br ${f.accent} text-white shadow-md ${f.bg}`}>
              <f.icon className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[16px] font-black text-foreground">{f.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
