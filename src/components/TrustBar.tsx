export function TrustBar() {
  return (
    <div className="w-full border-y border-border bg-secondary">
      <ul className="mx-auto flex w-full max-w-3xl items-center justify-between gap-2 px-4 py-5 text-[13px] font-bold text-secondary-foreground">
        <li className="flex items-center gap-1.5">
          <span>🛡️</span>
          <span>منتجات عالية الجودة</span>
        </li>
        <li className="flex items-center gap-1.5">
          <span>💵</span>
          <span>الدفع عند الاستلام</span>
        </li>
        <li className="flex items-center gap-1.5">
          <span>🚚</span>
          <span>توصيل سريع وآمن</span>
        </li>
      </ul>
    </div>
  );
}
