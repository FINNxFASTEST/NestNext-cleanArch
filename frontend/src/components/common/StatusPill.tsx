type StatusType =
  | "Paid"
  | "Pending"
  | "Cancel"
  | "Active"
  | "Paused"
  | "Full"
  | "Draft"
  | "Expired";

interface StatusPillProps {
  status: StatusType;
}

const STATUS_MAP: Record<
  StatusType,
  { bg: string; color: string; label: string }
> = {
  Paid: { bg: "#C7D1B8", color: "#2F4034", label: "Paid" },
  Pending: { bg: "#F3DCB2", color: "#8B5A2A", label: "Pending" },
  Cancel: { bg: "#EADBD3", color: "#A96438", label: "Cancelled" },
  Active: { bg: "#C7D1B8", color: "#2F4034", label: "● Active" },
  Paused: { bg: "#E7E4D8", color: "#4C5A4E", label: "Paused" },
  Full: { bg: "#F3C5A8", color: "#8B3E1A", label: "Full" },
  Draft: { bg: "#E7E4D8", color: "#4C5A4E", label: "Draft" },
  Expired: { bg: "#EADBD3", color: "#A96438", label: "Expired" },
};

export function StatusPill({ status }: StatusPillProps) {
  const m = STATUS_MAP[status] ?? STATUS_MAP.Paused;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-thai font-medium"
      style={{ background: m.bg, color: m.color }}
    >
      {m.label}
    </span>
  );
}
