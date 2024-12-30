"use client";

import { usePathname } from 'next/navigation';
import Sidebar from './components/Sidebar';

export default function SidebarLayout({ children }) {
  const pathname = usePathname();

  const noSidebarRoutes = ['/login'];
  const showSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 ${showSidebar ? 'ml-64' : ''} p-4`}>{children}</main>
    </div>
  );
}
