import { ShieldCheck, Truck, Wallet } from "lucide-react";

const ITEMS = [
  {
    icon: Truck,
    title: "توصيل سريع وآمن",
    desc: "لجميع الولايات",
  },
  {
    icon: Wallet,
    title: "الدفع عند الاستلام",
    desc: "ادفع بعد ما تستلم",
  },
  {
    icon: ShieldCheck,
    title: "منتجات عالية الجودة",
    desc: "موثوقة ومضمونة",
  },
];

export function TrustBar() {
  return (
    <div className="mt-4 mb-4 w-full">
      <div className="mx-auto w-full max-w-3xl px-4">
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border/60 bg-card p-3 shadow-soft sm:gap-3 sm:p-4">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-secondary/60 px-2 py-3 text-center sm:py-4"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary sm:h-11 sm:w-11">
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-[11px] font-extrabold text-foreground sm:text-sm leading-tight">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold text-muted-foreground sm:text-xs">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
