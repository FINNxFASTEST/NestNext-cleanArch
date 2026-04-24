"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/services";

const schema = z.object({
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่";
      setError("root", { message: typeof msg === "string" ? msg : "เกิดข้อผิดพลาด" });
    }
  }

  return (
    <main className="bg-paper text-ink min-h-screen">
      <Nav active="none" variant="solid" />

      <section className="px-4 md:px-14 py-10 md:py-14">
        <div className="mx-auto max-w-[520px] rounded-3xl border border-line p-6 md:p-8 bg-paper shadow-soft">
          <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2 text-sage-500">
            WELCOME BACK
          </div>
          <h1 className="font-serif m-0" style={{ fontSize: "clamp(30px, 5vw, 42px)", lineHeight: 1.1 }}>
            เข้าสู่ระบบ
          </h1>
          <p className="font-thai mt-3 mb-7 text-sm text-forest-600">
            เข้าสู่ระบบเพื่อดูการจอง จัดการโปรไฟล์ และรับข้อเสนอพิเศษจาก Kangtent
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
                Email
              </div>
              <Input
                type="email"
                placeholder="you@example.com"
                className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai"
                {...register("email")}
              />
              {errors.email && (
                <p className="font-thai text-xs mt-1 text-ember-dark">{errors.email.message}</p>
              )}
            </label>

            <label className="block">
              <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
                Password
              </div>
              <Input
                type="password"
                placeholder="********"
                className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai"
                {...register("password")}
              />
              {errors.password && (
                <p className="font-thai text-xs mt-1 text-ember-dark">{errors.password.message}</p>
              )}
            </label>

            {errors.root && (
              <div className="rounded-xl bg-ember/10 border border-ember/30 px-4 py-3 font-thai text-sm text-ember-dark">
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full font-thai font-medium text-[15px] py-3.5 rounded-full border-0 cursor-pointer bg-ember text-cream-50 disabled:opacity-60"
            >
              {isSubmitting ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div className="font-thai text-sm mt-5 text-center text-forest-600">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="text-ember-dark underline">
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
