import Link from "next/link";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="bg-paper text-ink min-h-screen">
      <Nav active="none" variant="solid" />

      <section className="px-4 md:px-14 py-10 md:py-14">
        <div className="mx-auto max-w-[620px] rounded-3xl border border-line p-6 md:p-8 bg-paper shadow-soft">
          <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2 text-sage-500">
            START YOUR JOURNEY
          </div>
          <h1 className="font-serif m-0" style={{ fontSize: "clamp(30px, 5vw, 42px)", lineHeight: 1.1 }}>
            สมัครสมาชิก
          </h1>
          <p className="font-thai mt-3 mb-7 text-sm text-forest-600">
            สร้างบัญชีเพื่อจองลานกางเต็นท์ บันทึกลานโปรด และติดตามทริปของคุณได้ง่ายขึ้น
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
                First Name
              </div>
              <Input type="text" placeholder="ชื่อ" className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai" />
            </label>

            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
                Last Name
              </div>
              <Input type="text" placeholder="นามสกุล" className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai" />
            </label>

            <label className="block md:col-span-2">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
                Email
              </div>
              <Input type="email" placeholder="you@example.com" className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai" />
            </label>

            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
                Password
              </div>
              <Input type="password" placeholder="อย่างน้อย 8 ตัวอักษร" className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai" />
            </label>

            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
                Confirm Password
              </div>
              <Input type="password" placeholder="พิมพ์รหัสผ่านอีกครั้ง" className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai" />
            </label>

            <button
              type="submit"
              className="md:col-span-2 mt-2 w-full font-thai font-medium text-[15px] py-3.5 rounded-full border-0 cursor-pointer bg-ember text-cream-50"
            >
              สร้างบัญชี
            </button>
          </form>

          <div className="font-thai text-sm mt-5 text-center text-forest-600">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/login" className="text-ember-dark underline">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
