import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./dashboard/_components/Sidebar";
import Footer from "./dashboard/_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Dashboard",
  description: "A dashboard for managing your learning projects",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div
      className={`flex min-h-screen bg-background font-sans antialiased ${inter.className}`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
    <Footer />
    </>
  );
}
