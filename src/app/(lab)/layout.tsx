import Header from "./lab/[id]/_components/Header";
import LabSidebar from "./lab/[id]/_components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Header />

      {/* Main Container */}
      <div className="flex flex-1 bg-black/95 container mx-auto md:grid md:grid-cols-[1fr_300px] md:gap-6 lg:grid-cols-[1fr_320px] lg:gap-10">
        {/* Workspace */}
        <main className="relative flex-1">
          <div className="h-[80vh]">{children}</div>
        </main>

        {/* Sidebar */}
        <LabSidebar />
      </div>
    </div>
  );
}
