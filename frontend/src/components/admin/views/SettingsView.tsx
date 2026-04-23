import { Scene } from "@/components/common/Scene";
import { Panel } from "@/components/admin/Panel";
import { ChevronDIcon } from "@/components/common/Icons";

function Field({ label, value, select }: { label: string; value: string; select?: boolean }) {
  return (
    <label className="block">
      <div
        className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5"
        style={{ color: "#7C8F6F" }}
      >
        {label}
      </div>
      <div
        className="rounded-xl text-sm flex justify-between items-center"
        style={{
          padding: "12px 14px",
          border: "1px solid var(--line-strong)",
          background: "var(--paper)",
          fontFamily: "var(--font-thai)",
          color: "var(--ink)",
        }}
      >
        <span>{value}</span>
        {select && <ChevronDIcon style={{ width: 16, height: 16, color: "#7C8F6F" }} />}
      </div>
    </label>
  );
}

function Row({ l, r, ember }: { l: string; r: string; ember?: boolean }) {
  return (
    <div
      className="flex justify-between font-thai text-sm"
      style={{ color: ember ? "#A96438" : "var(--ink)" }}
    >
      <span>{l}</span>
      <span className="font-serif font-medium">{r}</span>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className="relative cursor-pointer transition-colors"
      style={{
        width: 38,
        height: 22,
        borderRadius: 999,
        background: on ? "#2F4034" : "var(--line-strong)",
      }}
    >
      <div
        className="absolute top-[2px] w-[18px] h-[18px] rounded-full transition-all"
        style={{
          left: on ? 18 : 2,
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.2)",
        }}
      />
    </div>
  );
}

const NOTIFICATIONS = [
  { t: "การจองใหม่", d: "แจ้งทุกครั้งเมื่อมีการจองใหม่", on: true },
  { t: "ยกเลิกการจอง", d: "เมื่อผู้พักยกเลิก", on: true },
  { t: "รีวิวใหม่", d: "เมื่อมีรีวิวจากผู้พัก", on: true },
  { t: "การชำระเงิน", d: "เมื่อเงินถูกโอนเข้าบัญชี", on: false },
  { t: "ข่าวสารจาก Kangtent", d: "โปรโมชั่นและอัปเดต", on: false },
];

export function SettingsView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {/* Profile */}
      <Panel title="ข้อมูลเจ้าของลาน" eyebrow="PROFILE · โปรไฟล์">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-[72px] h-[72px] rounded-full overflow-hidden">
            <Scene variant="dusk" style={{ width: "100%", height: "100%" }} />
          </div>
          <div>
            <div className="font-serif text-xl font-medium">คุณนพดล ปรีดาชัย</div>
            <div className="font-thai text-xs mt-1" style={{ color: "#7C8F6F" }}>
              เจ้าของลาน · เขาใหญ่ แคมป์วิว
            </div>
            <button
              className="font-thai text-xs px-3.5 py-1.5 rounded-full cursor-pointer mt-2.5"
              style={{ background: "transparent", border: "1px solid var(--line-strong)", color: "var(--ink)" }}
            >
              เปลี่ยนรูป
            </button>
          </div>
        </div>
        <div className="grid gap-3.5">
          <Field label="ชื่อ-นามสกุล" value="นพดล ปรีดาชัย" />
          <Field label="อีเมล" value="nopadol@kangtent.co" />
          <Field label="เบอร์โทรศัพท์" value="089 445 2378" />
          <Field label="ชื่อลาน" value="เขาใหญ่ แคมป์วิว" />
        </div>
      </Panel>

      {/* Payouts */}
      <Panel title="การชำระเงิน" eyebrow="PAYOUTS · การโอนเงิน">
        <div
          className="flex gap-3 items-center rounded-xl mb-4"
          style={{ padding: 16, background: "var(--cream-100)" }}
        >
          <div
            className="w-10 h-10 rounded-[10px] grid place-items-center font-serif text-[13px] font-semibold flex-shrink-0"
            style={{ background: "#2F4034", color: "#F7F2E7" }}
          >
            KBK
          </div>
          <div className="flex-1">
            <div className="font-thai text-[13px] font-medium">ธนาคารกสิกรไทย</div>
            <div className="font-thai text-[11px] mt-0.5" style={{ color: "#7C8F6F" }}>
              •••• •••• •••• 4782 · นพดล ป.
            </div>
          </div>
          <button
            className="font-thai text-xs px-3.5 py-1.5 rounded-full cursor-pointer"
            style={{ background: "transparent", border: "1px solid var(--line-strong)", color: "var(--ink)" }}
          >
            เปลี่ยน
          </button>
        </div>
        <div className="grid gap-2.5">
          <Row l="รายได้สะสม" r="฿ 824,000" />
          <Row l="โอนครั้งล่าสุด" r="18 เม.ย 2569" />
          <Row l="รอโอน" r="฿ 28,400" ember />
          <Row l="กำหนดการถัดไป" r="25 เม.ย 2569" />
        </div>
        <button
          className="w-full font-thai font-medium text-sm py-3 rounded-full border-0 cursor-pointer mt-4"
          style={{ background: "#C97B4A", color: "#F7F2E7" }}
        >
          โอนทันที
        </button>
      </Panel>

      {/* Notifications */}
      <Panel title="การแจ้งเตือน" eyebrow="NOTIFICATIONS · แจ้งเตือน">
        <div className="grid gap-0.5">
          {NOTIFICATIONS.map((n, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 py-3"
              style={{ borderBottom: i < NOTIFICATIONS.length - 1 ? "1px solid var(--line)" : "none" }}
            >
              <div className="flex-1">
                <div className="font-thai text-[13px] font-medium">{n.t}</div>
                <div className="font-thai text-[11px] mt-0.5" style={{ color: "#7C8F6F" }}>
                  {n.d}
                </div>
              </div>
              <Toggle on={n.on} />
            </div>
          ))}
        </div>
      </Panel>

      {/* Preferences */}
      <Panel title="ภาษาและสกุลเงิน" eyebrow="PREFERENCES · การตั้งค่า">
        <div className="grid gap-3.5">
          <Field label="ภาษา" value="ภาษาไทย · English" select />
          <Field label="สกุลเงิน" value="฿ THB — บาทไทย" select />
          <Field label="โซนเวลา" value="(GMT+7) กรุงเทพฯ" select />
          <Field label="รูปแบบวันที่" value="DD / MM / YYYY" select />
        </div>
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
          <div
            className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2.5"
            style={{ color: "#7C8F6F" }}
          >
            DANGER ZONE · เขตอันตราย
          </div>
          <button
            className="font-thai text-[13px] px-[18px] py-2.5 rounded-full cursor-pointer"
            style={{
              background: "transparent",
              border: "1px solid #C97B4A",
              color: "#A96438",
              fontFamily: "var(--font-thai)",
            }}
          >
            ระงับบัญชีเจ้าของลาน
          </button>
        </div>
      </Panel>
    </div>
  );
}
