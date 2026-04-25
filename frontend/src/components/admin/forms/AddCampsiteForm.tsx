"use client";

import { useState, useEffect } from "react";
import { Scene } from "@/components/common/Scene";
import { PlusIcon, PinIcon } from "@/components/common/Icons";
import { FormShell } from "./FormShell";
import { FormField, FormInput, FormSelect, FormTextarea, Chip } from "./FormPrimitives";
import { AddAmenityModal, type CustomAmenity } from "./AddAmenityModal";
import { amenitiesApi, type AmenityDto } from "@/services/amenities.service";
import { ICON_REGISTRY } from "@/lib/icon-registry";

const CANCEL_POLICIES = [
  { t: "ยืดหยุ่น", d: "คืนเงินเต็มจำนวน ก่อนเข้าพัก 7 วัน" },
  { t: "ปานกลาง", d: "คืน 50% ก่อนเข้าพัก 3 วัน" },
  { t: "เข้มงวด", d: "ไม่คืนเงินหากยกเลิก" },
];

const VIBE_OPTIONS = ["ป่าเขา / วิวเขา", "ริมทะเล / ชายหาด", "ทุ่งนา / ชนบท", "ริมแม่น้ำ", "ดอยสูง / หมอก"];
const PROVINCE_OPTIONS = ["นครราชสีมา", "เชียงใหม่", "กาญจนบุรี", "เพชรบุรี", "ประจวบคีรีขันธ์"];
const DISTRICT_OPTIONS = ["ปากช่อง · หนองน้ำแดง", "ปากช่อง · วังน้ำเขียว", "สีคิ้ว", "ด่านขุนทด"];
const CHECKIN_OPTIONS = ["14:00 — 12:00", "13:00 — 11:00", "15:00 — 10:00", "12:00 — 12:00"];

export function AddCampsiteForm({ onClose }: { onClose?: () => void }) {
  const [globalAmenities, setGlobalAmenities] = useState<AmenityDto[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [showAddAmenity, setShowAddAmenity] = useState(false);
  const [cancelPolicy, setCancelPolicy] = useState(1);
  const [vibe, setVibe] = useState("ป่าเขา / วิวเขา");
  const [province, setProvince] = useState("นครราชสีมา");
  const [district, setDistrict] = useState("ปากช่อง · หนองน้ำแดง");
  const [checkIn, setCheckIn] = useState("14:00 — 12:00");

  useEffect(() => {
    amenitiesApi.list().then((r) => setGlobalAmenities(r.data)).catch(() => {});
  }, []);

  function toggleAmenity(id: string) {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleAddCustomAmenity(a: CustomAmenity) {
    const optimistic: AmenityDto = {
      id: `local-${a.label}-${a.englishName}`,
      label: a.label,
      englishName: a.englishName,
      iconKey: a.iconKey,
    };
    setGlobalAmenities((prev) => {
      const exists = prev.some(
        (x) => x.label === a.label || x.englishName === a.englishName,
      );
      return exists ? prev : [optimistic, ...prev];
    });
    setSelectedKeys((prev) => new Set([...prev, optimistic.id]));
    setTimeout(() => {
      amenitiesApi.list().then((r) => setGlobalAmenities(r.data)).catch(() => {});
    }, 800);
  }

  function openAddAmenityModal(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setShowAddAmenity(true);
  }

  return (
    <FormShell
      eyebrow="NEW CAMPSITE · สร้างลานใหม่"
      title="เพิ่มลานกางเตนท์"
      subtitle="เปิดลานใหม่ของคุณ กรอกข้อมูลพื้นฐานและจุดเด่น เพื่อให้ผู้พักค้นเจอคุณได้ง่าย"
      sceneVariant="meadow"
      onSubmitLabel="สร้างลาน"
      onClose={onClose}
    >
      {/* Name + vibe */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <FormField label="ชื่อลานกางเตนท์">
          <FormInput placeholder="เช่น เขาใหญ่ แคมป์วิว" />
        </FormField>
        <FormField label="บรรยากาศหลัก">
          <FormSelect value={vibe} onChange={setVibe} options={VIBE_OPTIONS} />
        </FormField>
      </div>

      {/* Story */}
      <FormField label="เรื่องราวของลาน" hint="บอกผู้มาพักว่าทำไมลานนี้พิเศษ — 2-3 ประโยค">
        <FormTextarea
          rows={3}
          placeholder="ลานของเราซ่อนตัวอยู่ริมเขา มองออกไปเห็นทะเลหมอกทุกเช้า..."
        />
      </FormField>

      {/* Province + district */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <FormField label="จังหวัด">
          <FormSelect value={province} onChange={setProvince} options={PROVINCE_OPTIONS} />
        </FormField>
        <FormField label="อำเภอ / ตำบล">
          <FormSelect value={district} onChange={setDistrict} options={DISTRICT_OPTIONS} />
        </FormField>
      </div>

      {/* GPS / map */}
      <div className="mt-[18px]">
        <FormField label="พิกัดที่ตั้ง">
          <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr auto" }}>
            <FormInput defaultValue="14.5821" placeholder="Latitude" />
            <FormInput defaultValue="101.4089" placeholder="Longitude" />
            <button className="inline-flex items-center gap-2 font-thai text-xs px-3.5 py-2.5 rounded-xl cursor-pointer bg-transparent border border-line-strong text-ink whitespace-nowrap">
              <PinIcon style={{ width: 14, height: 14 }} />
              ปักหมุดบนแผนที่
            </button>
          </div>
          <div className="relative h-[140px] rounded-xl overflow-hidden border border-line mt-2.5">
            <Scene variant="meadow" className="absolute inset-0 opacity-60" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(45deg, transparent 0 12px, rgba(47,64,52,.04) 12px 13px)",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <div
                className="w-8 h-8 rounded-full grid place-items-center"
                style={{
                  background: "var(--ember)",
                  border: "3px solid var(--cream-50)",
                  boxShadow: "0 6px 16px rgba(201,123,74,.4)",
                }}
              >
                <PinIcon style={{ width: 16, height: 16 }} className="text-cream-50" />
              </div>
            </div>
            <span className="absolute bottom-2.5 right-2.5 font-thai text-[10px] text-sage-500 px-2.5 py-1 rounded-full bg-cream-50/[0.92]">
              14.5821, 101.4089
            </span>
          </div>
        </FormField>
      </div>

      {/* Capacity + price + check-in */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        <FormField label="จำนวนพื้นที่กางเตนท์">
          <FormInput defaultValue="8" suffix="ลาน" />
        </FormField>
        <FormField label="ราคาเริ่มต้น">
          <FormInput defaultValue="380" prefix="฿" suffix="/คืน" />
        </FormField>
        <FormField label="เช็คอิน — เช็คเอาท์">
          <FormSelect value={checkIn} onChange={setCheckIn} options={CHECKIN_OPTIONS} />
        </FormField>
      </div>

      {/* Amenities */}
      <div className="mt-5">
        <FormField label="สิ่งอำนวยความสะดวก (ภาพรวมของลาน)">
          <div className="flex flex-wrap gap-2 mt-1">
            {globalAmenities.map((a) => {
              const on = selectedKeys.has(a.id);
              const IconComp = ICON_REGISTRY.find((e) => e.key === a.iconKey)?.Component;
              return (
                <Chip key={a.id} on={on} onClick={() => toggleAmenity(a.id)}>
                  <span className="inline-flex items-center gap-1">
                    {IconComp && <IconComp size={12} />}
                    {on ? "✓ " : ""}
                    {a.label}
                  </span>
                </Chip>
              );
            })}
            <button
              type="button"
              onClick={openAddAmenityModal}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-thai transition-all border border-dashed"
              style={{ borderColor: "var(--line-strong)", color: "var(--sage-500)" }}
            >
              <PlusIcon style={{ width: 11, height: 11 }} />
              กำหนดเอง
            </button>
          </div>
        </FormField>
      </div>

      {showAddAmenity && (
        <AddAmenityModal
          onAdd={handleAddCustomAmenity}
          onClose={() => setShowAddAmenity(false)}
        />
      )}

      {/* Images */}
      <div className="mt-5">
        <FormField label="ภาพลาน" hint="ภาพแรกจะเป็นภาพปกของลาน">
          <div
            className="mt-1 grid gap-2"
            style={{ gridTemplateColumns: "1.3fr 1fr 1fr 1fr" }}
          >
            <div className="relative h-[120px] rounded-xl overflow-hidden border border-line">
              <Scene variant="meadow" className="absolute inset-0" />
              <span className="absolute top-2 left-2 font-thai text-[10px] font-medium px-[9px] py-[3px] rounded-full text-cream-50 bg-ember">
                ภาพปก
              </span>
            </div>
            {(["forest", "lake"] as const).map((v) => (
              <div key={v} className="relative h-[120px] rounded-xl overflow-hidden border border-line">
                <Scene variant={v} className="absolute inset-0" />
              </div>
            ))}
            <div className="h-[120px] rounded-xl border-[1.5px] border-dashed border-line-strong bg-cream-50 grid place-items-center cursor-pointer">
              <div className="text-center">
                <PlusIcon style={{ width: 20, height: 20 }} className="text-sage-500 mx-auto" />
                <div className="font-thai text-[11px] text-sage-500 mt-1">เพิ่มภาพ</div>
              </div>
            </div>
          </div>
        </FormField>
      </div>

      {/* Rules + cancellation */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <FormField label="กฎระเบียบของลาน">
          <FormTextarea
            rows={3}
            placeholder={"• ห้ามก่อไฟนอกจุดที่กำหนด\n• งดเสียงดังหลัง 22:00 น."}
          />
        </FormField>
        <FormField label="การยกเลิก">
          <div className="grid gap-2">
            {CANCEL_POLICIES.map((o, i) => (
              <div
                key={i}
                onClick={() => setCancelPolicy(i)}
                className="flex gap-2.5 p-2.5 rounded-xl cursor-pointer border"
                style={{
                  border: `1px solid ${cancelPolicy === i ? "var(--forest-700)" : "var(--line)"}`,
                  background: cancelPolicy === i ? "#EEF1E6" : "var(--paper)",
                }}
              >
                <div
                  className="w-4 h-4 rounded-full grid place-items-center shrink-0 mt-0.5 border"
                  style={{
                    borderColor: cancelPolicy === i ? "var(--forest-700)" : "var(--line-strong)",
                    background: cancelPolicy === i ? "var(--forest-700)" : "transparent",
                  }}
                >
                  {cancelPolicy === i && <div className="w-[5px] h-[5px] rounded-full bg-white" />}
                </div>
                <div>
                  <div className="font-thai text-xs font-medium">{o.t}</div>
                  <div className="font-thai text-[11px] text-sage-500 mt-0.5">{o.d}</div>
                </div>
              </div>
            ))}
          </div>
        </FormField>
      </div>
    </FormShell>
  );
}
