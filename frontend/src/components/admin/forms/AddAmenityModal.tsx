"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ICON_REGISTRY, searchIcons } from "@/lib/icon-registry";
import { amenitiesApi } from "@/services/amenities.service";

export type CustomAmenity = { label: string; iconKey: string };

export function AddAmenityModal({
  onAdd,
  onClose,
}: {
  onAdd: (a: CustomAmenity) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [iconKey, setIconKey] = useState("FiStar");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => searchIcons(search), [search]);
  const selected = ICON_REGISTRY.find((e) => e.key === iconKey);

  useEffect(() => {
    nameRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleAdd() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    try {
      await amenitiesApi.create({ label: trimmed, iconKey });
    } catch {
      // non-critical — parent still gets the value
    } finally {
      setSaving(false);
    }
    onAdd({ label: trimmed, iconKey });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.35)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="rounded-2xl shadow-xl w-[360px] p-5 flex flex-col gap-4"
        style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className="font-sans text-[11px] tracking-[0.16em] uppercase font-medium"
            style={{ color: "var(--sage-500)" }}
          >
            เพิ่มสิ่งอำนวยความสะดวก
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full grid place-items-center text-xs transition-opacity hover:opacity-60"
            style={{ background: "var(--cream-100)", color: "var(--ink)" }}
          >
            ✕
          </button>
        </div>

        {/* Icon search */}
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาไอคอน…"
            className="w-full rounded-xl px-3 py-2 text-sm font-thai outline-none transition mb-2"
            style={{
              background: "var(--cream-50)",
              border: "1.5px solid var(--line)",
              color: "var(--ink)",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--forest-700)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--line)")
            }
          />

          {/* Scrollable icon grid */}
          <div
            className="overflow-y-auto rounded-xl p-2"
            style={{
              maxHeight: 188,
              background: "var(--cream-50)",
              border: "1.5px solid var(--line)",
            }}
          >
            {filtered.length === 0 ? (
              <p
                className="text-center text-xs font-thai py-4"
                style={{ color: "var(--sage-500)" }}
              >
                ไม่พบไอคอน
              </p>
            ) : (
              <div className="grid grid-cols-8 gap-1">
                {filtered.map(({ key, label, Component }) => {
                  const on = iconKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      title={label}
                      onClick={() => setIconKey(key)}
                      className="flex items-center justify-center rounded-lg transition-all"
                      style={{
                        width: 34,
                        height: 34,
                        background: on ? "#EEF1E6" : "transparent",
                        border: `1.5px solid ${on ? "var(--forest-700)" : "transparent"}`,
                        color: on ? "var(--forest-700)" : "var(--sage-500)",
                      }}
                    >
                      <Component size={16} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected preview */}
          {selected && (
            <div
              className="mt-2 flex items-center gap-2 rounded-xl px-3 py-1.5 w-fit"
              style={{
                background: "#EEF1E6",
                border: "1.5px solid var(--forest-700)",
                color: "var(--forest-700)",
              }}
            >
              <selected.Component size={14} />
              <span className="font-thai text-xs">{selected.label}</span>
            </div>
          )}
        </div>

        {/* Name input */}
        <div>
          <label
            className="font-sans text-[10px] tracking-[0.14em] uppercase font-medium mb-1.5 block"
            style={{ color: "var(--sage-500)" }}
          >
            ชื่อ
          </label>
          <input
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            placeholder="เช่น ร่มเงา, สัญญาณดี…"
            className="w-full rounded-xl px-3 py-2 text-sm font-thai outline-none transition"
            style={{
              background: "var(--cream-50)",
              border: "1.5px solid var(--line)",
              color: "var(--ink)",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--forest-700)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--line)")
            }
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl py-2 text-sm font-thai transition-opacity hover:opacity-70"
            style={{
              background: "var(--cream-100)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
            }}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!name.trim() || saving}
            className="flex-1 rounded-xl py-2 text-sm font-thai font-medium transition-opacity disabled:opacity-40"
            style={{ background: "var(--forest-700)", color: "#fff" }}
          >
            {saving ? "…" : "เพิ่ม"}
          </button>
        </div>
      </div>
    </div>
  );
}
