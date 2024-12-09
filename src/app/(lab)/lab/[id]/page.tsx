import React from 'react'
import Workspace from './_components/Workspace'
import Header from './_components/Header'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import LabSidebar from './_components/Sidebar'
const Lab = () => {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Header />
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex-1">
          <Workspace />
        </div>
      </SidebarInset>
      <LabSidebar side="right" variant='sidebar' />
    </SidebarProvider>
  )
}

export default Lab