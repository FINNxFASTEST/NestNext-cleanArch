import Link from "next/link";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";

export default function RegisterPage() {
  return (
    <main style={{ background: "var(--paper)", color: "var(--ink)", minHeight: "100vh" }}>
      <Nav active="none" variant="solid" />

      <section className="px-4 md:px-14 py-10 md:py-14">
        <div className="mx-auto max-w-[620px] rounded-3xl border p-6 md:p-8" style={{ background: "var(--paper)", borderColor: "var(--line)", boxShadow: "var(--shadow-soft)" }}>
          <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2" style={{ color: "#7C8F6F" }}>
            START YOUR JOURNEY
          </div>
          <h1 className="font-serif m-0" style={{ fontSize: "clamp(30px, 5vw, 42px)", lineHeight: 1.1 }}>
            สมัครสมาชิก
          </h1>
          <p className="font-thai mt-3 mb-7 text-sm" style={{ color: "#4C5A4E" }}>
            สร้างบัญชีเพื่อจองลานกางเต็นท์ บันทึกลานโปรด และติดตามทริปของคุณได้ง่ายขึ้น
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5" style={{ color: "#7C8F6F" }}>
                First Name
              </div>
              <input
                type="text"
                placeholder="ชื่อ"
                className="w-full rounded-xl text-sm"
                style={{ padding: "12px 14px", border: "1px solid var(--line-strong)", background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--font-thai)" }}
              />
            </label>

            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5" style={{ color: "#7C8F6F" }}>
                Last Name
              </div>
              <input
                type="text"
                placeholder="นามสกุล"
                className="w-full rounded-xl text-sm"
                style={{ padding: "12px 14px", border: "1px solid var(--line-strong)", background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--font-thai)" }}
              />
            </label>

            <label className="block md:col-span-2">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5" style={{ color: "#7C8F6F" }}>
                Email
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl text-sm"
                style={{ padding: "12px 14px", border: "1px solid var(--line-strong)", background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--font-thai)" }}
              />
            </label>

            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5" style={{ color: "#7C8F6F" }}>
                Password
              </div>
              <input
                type="password"
                placeholder="อย่างน้อย 8 ตัวอักษร"
                className="w-full rounded-xl text-sm"
                style={{ padding: "12px 14px", border: "1px solid var(--line-strong)", background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--font-thai)" }}
              />
            </label>

            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5" style={{ color: "#7C8F6F" }}>
                Confirm Password
              </div>
              <input
                type="password"
                placeholder="พิมพ์รหัสผ่านอีกครั้ง"
                className="w-full rounded-xl text-sm"
                style={{ padding: "12px 14px", border: "1px solid var(--line-strong)", background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--font-thai)" }}
              />
            </label>

            <button
              type="submit"
              className="md:col-span-2 mt-2 w-full font-thai font-medium text-[15px] py-3.5 rounded-full border-0 cursor-pointer"
              style={{ background: "#C97B4A", color: "#F7F2E7" }}
            >
              สร้างบัญชี
            </button>
          </form>

          <div className="font-thai text-sm mt-5 text-center" style={{ color: "#4C5A4E" }}>
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/login" style={{ color: "#A96438", textDecoration: "underline" }}>
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
