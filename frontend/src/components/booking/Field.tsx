import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  value: string;
  mono?: boolean;
}

export function Field({ label, value, mono }: FieldProps) {
  return (
    <label className="block">
      <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
        {label}
      </div>
      <Input
        readOnly
        value={value}
        className={cn(
          "rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 text-sm",
          mono && "font-mono"
        )}
      />
    </label>
  );
}
