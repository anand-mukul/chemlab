import Header from "./lab/[id]/_components/Header";
import LabSidebar from "./lab/[id]/_components/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
