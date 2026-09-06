import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2, MapPin, Package, Phone, ShoppingBag, User } from "lucide-react";
import { WILAYAS, getWilaya } from "@/data/algeria";
import { PRODUCT } from "@/data/product";
import { GOOGLE_SHEETS_WEB_APP_URL } from "@/data/order-config";

type Delivery = "desk" | "home";

type Errors = Partial<Record<"name" | "phone" | "wilaya" | "commune" | "delivery", string>>;

const dz = (n: number) => n.toLocaleString("en-US");

// قائمة البلديات التي فيها مكتب ياليدين Stop Desk - من بحث الويب + مقرات الولايات
const DESK_COMMUNES = new Set([
  "أدرار", "تيميمون", "عين الدفلى", "عين تموشنت", "الجزائر الوسطى", "باب الزوار", "الشراقة", "برج البحري", "بئر مراد رايس", "باب الوادي", "الدار البيضاء", "حسين داي", "الرويبة", "برج الكيفان", "بئر توتة", "زرالدة",
  "عنابة", "البوني", "سيدي عمار", "الحجار", "برحال",
  "باتنة", "تازولت", "بريكة", "عين التوتة", "مروانة",
  "بجاية", "أقبو", "أميزور", "القصر", "سوق الإثنين", "خراطة",
  "بسكرة", "أولاد جلال", "طولقة", "القنطرة", "أورلال",
  "بشار", "العبادلة", "بني عباس", "تاغيت",
  "البليدة", "بوفاريك", "العفرون", "مفتاح", "الأربعاء", "بوعرفة",
  "البويرة", "الأخضرية", "سور الغزلان", "عين بسام", "لاخضرية",
  "تمنراست", "عين صالح", "عين قزام",
  "تبسة", "بئر العاتر", "الشريعة", "الونزة",
  "تلمسان", "مغنية", "الرمشي", "الغزوات", "سبدو", "العريشة", "ندرومة", "هنين",
  "تيارت", "قصر الشلالة", "فرندة", "السوقر", "مهدية",
  "تيزي وزو", "أزفون", "ذراع بن خدة", "بوغني", "عزازقة", "تيقزيرت", "ذراع الميزان", "واضية",
  "الجلفة", "عين وسارة", "مسعد", "حاسي بحبح", "الادريسية",
  "جيجل", "الطاهير", "الميلية", "الشقفة",
  "سطيف", "العلمة", "عين ولمان", "عين أزال", "عين الكبيرة", "بوقاعة", "عين أرنات",
  "سعيدة", "يوب",
  "سكيكدة", "القل", "عزابة", "الحروش", "الحدائق",
  "سيدي بلعباس", "بن باديس", "تلاغ", "سفيزف",
  "قالمة", "بوشقوف", "هيليوبوليس", "وادي الزناتي",
  "قسنطينة", "الخروب", "حامة بوزيان", "ديدوش مراد", "زيغود يوسف", "علي منجلي",
  "المدية", "قصر البخاري", "البرواقية", "تابلاط", "عين بوسيف", "بني سليمان",
  "مستغانم", "عين تادلس", "سيدي علي", "بوقيراط",
  "المسيلة", "بوسعادة", "سيدي عيسى", "عين الملح", "مقرة",
  "معسكر", "المحمدية", "سيق", "غريس", "تيغنيف",
  "ورقلة", "حاسي مسعود", "تقرت", "تماسين", "الحجيرة",
  "وهران", "بئر الجير", "السانية", "أرزيو", "قديل", "وادي تليلات", "بطيوة", "عين الترك",
  "البيض", "الأبيض سيدي الشيخ", "بريزينة", "بوقطب",
  "إليزي", "إن أمناس", "جانت", "برج الحواس",
  "برج بوعريريج", "رأس الوادي", "المنصورة", "برج الغدير",
  "بومرداس", "بودواو", "برج منايل", "الثنية", "دلس", "خميس الخشنة",
  "الطارف", "القالة", "بوحجار", "البسباس", "الذرعان",
  "تندوف", "أم العسل",
  "تيسمسيلت", "ثنية الأحد", "برج بونعامة",
  "الوادي", "قمار", "الدبيلة", "الرباح", "جامعة", "المغير",
  "خنشلة", "قايس", "ششار", "أولاد رشاش",
  "سوق أهراس", "مداوروش", "سدراتة",
  "تيبازة", "شرشال", "القليعة", "حجوط", "فوكة", "بواسماعيل", "بوسماعيل",
  "ميلة", "فرجيوة", "شلغوم العيد", "تاجنانت", "التلاغمة",
  "عين الدفلة", "خميس مليانة", "العطاف", "جليدة", "مليانة",
  "النعامة", "المشرية", "عين الصفراء", "مغرار",
  "عين تيموشنت", "بني صاف", "العامرية", "حمام بوحجر",
  "غرداية", "بريان", "القرارة", "متليلي", "المنيعة", "حاسي الفحل",
  "غليزان", "وادي رهيو", "زمورة", "المطمر", "جديوية", "عمي موسى",
  "برج باجي مختار", "أولاد جلال", "بني عباس", "عين صالح", "عين قزام", "تقرت", "جانت", "المغير", "المنيعة", "أفلو", "بريكة", "القنطرة", "بئر العاتر", "العريشة", "قصر الشلالة", "عين وسارة", "مسعد", "قصر البخاري", "بوسعادة", "الأبيض سيدي الشيخ"
]);

function hasDeskOffice(commune: string, wilayaName: string) {
  // إذا البلدية نفس اسم الولاية فأكيد فيها مكتب
  if (commune === wilayaName) return true;
  // إذا البلدية في قائمة المكاتب المعروفة فقط
  if (DESK_COMMUNES.has(commune)) return true;
  return false;
}

export function OrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [delivery, setDelivery] = useState<Delivery | "">("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => {
      const el = successRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }, 60);
    return () => window.clearTimeout(id);
  }, [done]);

  const selected = useMemo(() => (wilaya ? getWilaya(wilaya) : undefined), [wilaya]);
  const communes = selected?.communes ?? [];

  const shipping =
    selected && delivery ? (delivery === "desk" ? selected.deskPrice : selected.homePrice) : 0;
  const showTotals = Boolean(selected && commune && delivery);
  const total = PRODUCT.price + shipping;

  const validate = () => {
    const e: Errors = {};
    if (name.trim().length < 3) e.name = "الرجاء إدخال الاسم الكامل";
    if (!/^0[567]\d{8}$/.test(phone.replace(/\s/g, "")))
      e.phone = "رقم هاتف جزائري غير صحيح (مثال: 0551234567)";
    if (!wilaya) e.wilaya = "الرجاء اختيار الولاية";
    if (!commune) e.commune = "الرجاء اختيار البلدية";
    if (!delivery) e.delivery = "الرجاء اختيار طريقة التوصيل";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitError("");
    setSending(true);

    try {
      if (GOOGLE_SHEETS_WEB_APP_URL) {
        await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.replace(/\s/g, ""),
            wilaya: selected?.name ?? "",
            commune,
            delivery: delivery === "desk" ? "المكتب" : "المنزل",
            productPrice: PRODUCT.price,
            shippingPrice: shipping,
            total,
            product: PRODUCT.name,
          }),
        });
      }
      // حتى لو الرابط غير موجود، نعتبر الطلب ناجح للعرض
      setDone(true);
    } catch {
      setSubmitError("تعذّر إرسال الطلب. تحقق من اتصال الإنترنت وحاول مرة أخرى.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <section id="order" ref={successRef} className="mx-auto w-full max-w-md scroll-mt-24 px-4 pb-6 pt-10">
        <div className="animate-fade-in overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="bg-secondary px-5 pb-6 pt-7 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-card shadow-soft">
              <CheckCircle2 className="h-10 w-10 text-primary" strokeWidth={2.2} />
            </span>
            <h2 className="mt-4 text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
              تم تأكيد طلبك بنجاح 🎉
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              شكرًا لثقتك بنا. تم تسجيل طلبك بنجاح وسنتواصل معك قريبًا لتأكيد تفاصيل طلبك.
            </p>
          </div>

          <div className="p-5">
            <h3 className="text-sm font-extrabold text-foreground">تفاصيل الطلب</h3>
            <dl className="mt-3 space-y-2">
              <Detail icon={<User className="h-4 w-4" />} label="الاسم الكامل" value={name} />
              <Detail icon={<Phone className="h-4 w-4" />} label="رقم الهاتف" value={phone} ltr />
              <Detail icon={<MapPin className="h-4 w-4" />} label="الولاية" value={selected?.name ?? ""} />
              <Detail icon={<MapPin className="h-4 w-4" />} label="البلدية" value={commune} />
              <Detail icon={<ShoppingBag className="h-4 w-4" />} label="المنتج" value={PRODUCT.name} />
              <Detail icon={<Package className="h-4 w-4" />} label="الكمية" value="1" />
              <Detail
                icon={<Package className="h-4 w-4" />}
                label="طريقة التوصيل"
                value={delivery === "desk" ? "إلى المكتب" : "إلى المنزل"}
              />
            </dl>

            <div className="mt-3 flex items-center justify-between rounded-2xl bg-primary px-4 py-3 text-primary-foreground">
              <span className="text-sm font-bold">السعر الإجمالي</span>
              <span className="text-base font-extrabold">
                {dz(total)} {PRODUCT.currency}
              </span>
            </div>

            <p className="mt-4 rounded-2xl border border-border bg-background p-3 text-center text-xs font-semibold leading-relaxed text-muted-foreground">
              الخطوة التالية: سيتصل بك أحد أعضاء فريقنا على رقمك لتأكيد الطلب، ثم نرسله إليك — والدفع
              عند الاستلام.
            </p>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section id="order" className="mx-auto w-full max-w-lg px-4 pt-6 pb-2">
      <h2 className="text-center text-[26px] font-black text-foreground">استمارة الطلب</h2>

      <form onSubmit={submit} noValidate className="mt-5 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
        <Field label="الاسم الكامل" error={errors.name}>
          <input
            className="field"
            placeholder="أدخل اسمك الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </Field>

        <Field label="رقم الهاتف" error={errors.phone}>
          <input
            className="field text-right"
            dir="rtl"
            inputMode="tel"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            style={{ textAlign: 'right' }}
          />
        </Field>

        <Field label="الولاية" error={errors.wilaya}>
          <select
            className="field"
            value={wilaya}
            onChange={(e) => {
              setWilaya(e.target.value);
              setCommune("");
            }}
          >
            <option value="">اختر الولاية</option>
            {WILAYAS.map((w) => (
              <option key={w.code} value={w.code}>
                {w.code} - {w.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="البلدية" error={errors.commune}>
          <select
            className="field"
            value={commune}
            disabled={!selected}
            onChange={(e) => setCommune(e.target.value)}
          >
            <option value="">{selected ? "اختر البلدية" : "اختر الولاية أولاً"}</option>
            {communes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        {selected && commune && (
          <div className="animate-fade-in space-y-2">
            <span className="block text-sm font-bold text-foreground">طريقة التوصيل</span>
            {(() => {
              const hasDesk = hasDeskOffice(commune, selected.name);
              const options = hasDesk
                ? [
                    { key: "desk" as const, label: "التوصيل إلى المكتب", price: selected.deskPrice },
                    { key: "home" as const, label: "التوصيل إلى المنزل", price: selected.homePrice },
                  ]
                : [
                    { key: "home" as const, label: "التوصيل إلى المنزل", price: selected.homePrice },
                  ];
              // إذا البلدية ما فيهاش مكتب، اختر المنزل تلقائياً
              if (!hasDesk && delivery === "desk") {
                setTimeout(() => setDelivery("home"), 0);
              }
              return (
                <>
                  {!hasDesk && (
                    <p className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                      ℹ️ هذه البلدية لا تحتوي على مكتب Yalidine، التوصيل متوفر فقط إلى المنزل
                    </p>
                  )}
                  {options.map((o) => (
                    <label
                      key={o.key}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors ${
                        delivery === o.key ? "border-primary bg-secondary" : "border-border bg-background"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          className="h-5 w-5 accent-[var(--primary)]"
                          checked={delivery === o.key}
                          onChange={() => setDelivery(o.key)}
                        />
                        <span className="text-sm font-semibold text-foreground">{o.label}</span>
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {dz(o.price)} {PRODUCT.currency}
                      </span>
                    </label>
                  ))}
                </>
              );
            })()}
            {errors.delivery && <p className="text-xs font-semibold text-destructive">{errors.delivery}</p>}
          </div>
        )}

        {showTotals && (
          <div className="animate-fade-in space-y-2 rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground">
            <Row label="سعر المنتج" value={`${dz(PRODUCT.price)} ${PRODUCT.currency}`} />
            <Row label="التوصيل" value={`${dz(shipping)} ${PRODUCT.currency}`} />
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between text-base font-extrabold text-foreground">
              <span>السعر الإجمالي</span>
              <span>
                {dz(total)} {PRODUCT.currency}
              </span>
            </div>
          </div>
        )}

        {submitError && (
          <p role="alert" className="rounded-2xl bg-destructive/10 p-3 text-center text-sm font-semibold text-destructive">
            {submitError}
          </p>
        )}

        <button type="submit" disabled={sending} className="btn-cta-pro w-full group">
          {sending ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : (
            <>
              <span>✓</span>
              <span>تأكيد الطلب الآن</span>
              <span className="transition-transform group-hover:translate-x-[-3px]">←</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-foreground">{label}</span>
      {children}
      {error && <p className="mt-1 text-xs font-semibold text-destructive">{error}</p>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
