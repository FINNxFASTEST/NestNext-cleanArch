import { Scene, SceneVariant } from "@/components/common/Scene";

interface FormShellProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  sceneVariant?: SceneVariant;
  onCloseLabel?: string;
  onSubmitLabel?: string;
  footerNote?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

export function FormShell({
  eyebrow,
  title,
  subtitle,
  sceneVariant = "forest",
  onCloseLabel = "ยกเลิก",
  onSubmitLabel = "บันทึก",
  footerNote,
  onClose,
  children,
}: FormShellProps) {
  return (
    <div
      className="bg-paper rounded-[18px] border border-line overflow-hidden"
      style={{ boxShadow: "0 18px 48px -24px rgba(47,64,52,.25)" }}
    >
      {/* Scene header */}
      <div className="relative h-[120px] overflow-hidden">
        <Scene variant={sceneVariant} className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(27,38,32,.65), rgba(27,38,32,.25))" }}
        />
        <div className="absolute inset-0 p-[22px_26px] text-cream-50 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="font-sans text-[11px] tracking-[0.18em] uppercase text-cream-50 opacity-75">
              {eyebrow}
            </div>
            <button
              onClick={onClose}
              className="w-[30px] h-[30px] rounded-full grid place-items-center text-cream-50 cursor-pointer text-sm leading-none"
              style={{
                background: "rgba(247,242,231,.18)",
                border: "1px solid rgba(247,242,231,.2)",
              }}
            >
              ×
            </button>
          </div>
          <div>
            <h3
              className="font-serif text-[26px] m-0 font-medium"
              style={{ letterSpacing: "-0.01em" }}
            >
              {title}
            </h3>
            {subtitle && <div className="font-thai text-xs opacity-80 mt-1">{subtitle}</div>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-[26px]">{children}</div>

      {/* Footer */}
      <div className="px-[26px] py-4 border-t border-line bg-cream-50 flex justify-between items-center gap-3">
        <div className="font-thai text-[11px] text-sage-500 flex-1">{footerNote}</div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="font-thai text-[13px] px-[18px] py-2.5 rounded-full cursor-pointer bg-transparent border border-line-strong text-ink"
          >
            {onCloseLabel}
          </button>
          <button className="font-thai text-[13px] px-[22px] py-2.5 rounded-full border-0 cursor-pointer bg-ember text-cream-50">
            {onSubmitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
