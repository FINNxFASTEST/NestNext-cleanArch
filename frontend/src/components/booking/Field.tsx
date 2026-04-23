interface FieldProps {
  label: string;
  value: string;
  mono?: boolean;
}

export function Field({ label, value, mono }: FieldProps) {
  return (
    <label className="block">
      <div
        className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5"
        style={{ color: "#7C8F6F" }}
      >
        {label}
      </div>
      <div
        className="rounded-xl text-sm"
        style={{
          padding: "12px 14px",
          border: "1px solid var(--line-strong)",
          background: "var(--paper)",
          fontFamily: mono ? "monospace" : "var(--font-thai)",
          color: "var(--ink)",
        }}
      >
        {value}
      </div>
    </label>
  );
}
