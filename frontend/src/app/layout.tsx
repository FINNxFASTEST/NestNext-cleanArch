import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kangtent — Cozy Campsite Booking",
  description: "จองลานกางเต็นท์ทั่วไทยง่ายๆ ในไม่กี่คลิก",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <div className="max-w-[1920px] mx-auto overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
