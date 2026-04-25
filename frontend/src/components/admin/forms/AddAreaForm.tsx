"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/common/Icons";
import { FormShell } from "./FormShell";
import { FormField, FormInput, FormSelect, FormTextarea, Chip } from "./FormPrimitives";

const SIZES = ["2 × 2 ม.", "3 × 3 ม.", "4 × 4 ม.", "5 × 5 ม.", "กำหนดเอง"];

const AMENITY_OPTIONS = [
  "ไฟฟ้า",
  "น้ำประปา",
  "โต๊ะ-เก้าอี้",
  "เตาไฟ",
  "วิวภูเขา",
  "ใกล้ห้องน้ำ",
  "จอดรถข้างลาน",
];
const DEFAULT_AMENITIES = new Set(["ไฟฟ้า", "น้ำประปา", "โต๊ะ-เก้าอี้", "วิวภูเขา"]);

const INIT_STATUSES = [
  { t: "เปิดรับจองทันที", d: "แสดงในหน้าค้นหาและรับจองได้" },
  { t: "ร่างไว้ก่อน", d: "บันทึกเป็นแบบร่าง ยังไม่แสดงสู่สาธารณะ" },
];

const CAMPSITE_OPTIONS = [
  "เขาใหญ่ แคมป์วิว",
  "ดอยสูง แคมป์",
  "ริมน้ำ รีสอร์ท",
  "ทุ่งดอกไม้ แคมป์",
];
const AREA_TYPE_OPTIONS = [
  "ลานเตนท์มาตรฐาน",
  "เตนท์กลามปิ้ง",
  "แคบิน",
  "RV / รถบ้าน",
];

export function AddAreaForm({ onClose }: { onClose?: () => void }) {
  const [selectedSize, setSelectedSize] = useState(1);
  const [amenities, setAmenities] = useState<Set<string>>(new Set(DEFAULT_AMENITIES));
  const [initStatus, setInitStatus] = useState(0);
  const [campsite, setCampsite] = useState("เขาใหญ่ แคมป์วิว");
  const [areaType, setAreaType] = useState("ลานเตนท์มาตรฐาน");

  function toggleAmenity(label: string) {
    setAmenities((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  return (
    <FormShell
      eyebrow="NEW PLOT · เพิ่มพื้นที่"
      title="เพิ่มพื้นที่กางเตนท์"
      subtitle="เลือกตำแหน่ง ขนาด และราคา เพื่อเปิดรับการจอง"
      sceneVariant="forest"
      onSubmitLabel="เพิ่มพื้นที่"
      onClose={onClose}
    >
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <FormField label="ชื่อพื้นที่">
          <FormInput placeholder="เช่น ลานริมเขา A3" />
        </FormField>
        <FormField label="รหัสพื้นที่">
          <FormInput placeholder="A-03" prefix="#" />
        </FormField>
        <FormField label="ลานต้นสังกัด">
          <FormSelect value={campsite} onChange={setCampsite} options={CAMPSITE_OPTIONS} />
        </FormField>
        <FormField label="ประเภทพื้นที่">
          <FormSelect value={areaType} onChange={setAreaType} options={AREA_TYPE_OPTIONS} />
        </FormField>
      </div>

      {/* Size chips */}
      <div className="mb-5">
        <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-2.5 text-sage-500">
          SIZE · ขนาดลาน
        </div>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map((s, i) => (
            <Chip key={s} on={selectedSize === i} onClick={() => setSelectedSize(i)}>
              {s}
            </Chip>
          ))}
        </div>
      </div>

      {/* Pricing row */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <FormField label="ราคา / คืน">
          <FormInput defaultValue="480" prefix="฿" suffix="บาท" />
        </FormField>
        <FormField label="รองรับสูงสุด">
          <FormInput defaultValue="4" suffix="คน" />
        </FormField>
        <FormField label="จำนวนเตนท์ในพื้นที่">
          <FormInput defaultValue="1" suffix="หลัง" />
        </FormField>
      </div>

      {/* Amenities */}
      <FormField label="สิ่งอำนวยความสะดวก">
        <div className="flex gap-2 flex-wrap mt-1">
          {AMENITY_OPTIONS.map((label) => {
            const on = amenities.has(label);
            return (
              <Chip key={label} on={on} onClick={() => toggleAmenity(label)}>
                {on ? "✓ " : ""}
                {label}
              </Chip>
            );
          })}
        </div>
      </FormField>

      {/* Description */}
      <div className="mt-5">
        <FormField label="รายละเอียดเพิ่มเติม">
          <FormTextarea rows={3} placeholder="อธิบายบรรยากาศ จุดเด่น ข้อควรรู้ของลานนี้..." />
        </FormField>
      </div>

      {/* Image upload + initial status */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <FormField label="ภาพพื้นที่">
          <div className="border-[1.5px] border-dashed border-line-strong rounded-xl p-5 text-center bg-cream-50">
            <PlusIcon style={{ width: 22, height: 22 }} className="text-sage-500 mx-auto mb-1.5" />
            <div className="font-thai text-xs text-sage-500">ลากภาพมาวาง หรือ คลิกเพื่ออัปโหลด</div>
            <div className="font-thai text-[10px] text-sage-500 mt-1 opacity-70">JPG, PNG · สูงสุด 5 ภาพ</div>
          </div>
        </FormField>
        <FormField label="สถานะเริ่มต้น">
          <div className="grid gap-2">
            {INIT_STATUSES.map((o, i) => (
              <div
                key={i}
                onClick={() => setInitStatus(i)}
                className="flex gap-3 p-3 rounded-xl cursor-pointer border"
                style={{
                  border: `1px solid ${initStatus === i ? "var(--forest-700)" : "var(--line)"}`,
                  background: initStatus === i ? "#EEF1E6" : "var(--paper)",
                }}
              >
                <div
                  className="shrink-0 mt-0.5 w-[18px] h-[18px] rounded-full grid place-items-center border"
                  style={{
                    borderColor: initStatus === i ? "var(--forest-700)" : "var(--line-strong)",
                    background: initStatus === i ? "var(--forest-700)" : "transparent",
                  }}
                >
                  {initStatus === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="font-thai text-[13px] font-medium">{o.t}</div>
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
