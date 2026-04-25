import { ChevronDIcon } from "@/components/common/Icons";

interface FormFieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({ label, hint, children }: FormFieldProps) {
  return (
    <label className="block">
      <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
        {label}
      </div>
      {children}
      {hint && <div className="font-thai text-[11px] mt-1.5 text-sage-500">{hint}</div>}
    </label>
  );
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: string;
  variant?: "code";
}

export function FormInput({ prefix, suffix, variant, className, ...rest }: FormInputProps) {
  const base =
    "w-full py-3 rounded-xl border border-line-strong text-sm bg-paper font-thai text-ink outline-none focus:border-forest-700 transition-colors";
  const code =
    variant === "code"
      ? "font-serif font-semibold tracking-[0.14em] uppercase text-base text-forest-800 bg-cream-50 border-forest-700"
      : "";
  const pl = prefix ? "pl-8" : "pl-3.5";
  const pr = suffix ? "pr-12" : "pr-3.5";

  return (
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-3.5 text-sm text-sage-500 pointer-events-none z-10 font-thai select-none">
          {prefix}
        </span>
      )}
      <input className={`${base} ${code} ${pl} ${pr} ${className ?? ""}`} {...rest} />
      {suffix && (
        <span className="absolute right-3.5 text-xs text-sage-500 pointer-events-none font-thai select-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

interface FormSelectProps {
  value: string;
  onChange?: (value: string) => void;
  options?: string[];
}

export function FormSelect({ value, onChange, options }: FormSelectProps) {
  if (onChange && options && options.length > 0) {
    return (
      <div className="relative flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-3 pr-9 rounded-xl border border-line-strong text-sm bg-paper font-thai text-ink cursor-pointer outline-none focus:border-forest-700 transition-colors appearance-none"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDIcon
          style={{ width: 16, height: 16 }}
          className="absolute right-3.5 text-sage-500 pointer-events-none shrink-0"
        />
      </div>
    );
  }
  return (
    <div className="w-full px-3.5 py-3 rounded-xl border border-line-strong text-sm bg-paper font-thai text-ink flex justify-between items-center cursor-pointer">
      <span>{value}</span>
      <ChevronDIcon style={{ width: 16, height: 16 }} className="text-sage-500 shrink-0" />
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export function FormTextarea({ rows = 3, className, ...rest }: FormTextareaProps) {
  return (
    <textarea
      rows={rows}
      className={`w-full px-3.5 py-3 rounded-xl border border-line-strong text-sm bg-paper font-thai text-ink resize-y leading-relaxed outline-none focus:border-forest-700 transition-colors ${className ?? ""}`}
      {...rest}
    />
  );
}

interface ChipProps {
  on?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Chip({ on, onClick, children }: ChipProps) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-[7px] rounded-full text-xs cursor-pointer font-thai border select-none transition-colors ${
        on
          ? "bg-forest-800 text-cream-50 border-forest-800"
          : "bg-paper text-ink border-line"
      }`}
    >
      {children}
    </span>
  );
}
